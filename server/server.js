// Server code
// Based on https://github.com/mars/heroku-cra-node/blob/master/server/index.js
// Authors: Liam (exradr) and Josh (joshnguyen99)

const express = require("express");
const path = require("path");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const multer = require("multer");
const upload = multer();

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  // Create a new Express app
  const app = express();
  // Allow app to require for a resource outside origin
  app.use(cors());
  app.use(express.json());

  // Create Mongoose to connect to database
  var mongoose = require("mongoose");
  const uri = process.env.MONGODB_URI;
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  // Establish connection to database
  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connection established successfully.");
  });

  apiRouter = require("./routes/routes");
  app.use("/api", apiRouter);

  const client_directory = path.join(__dirname, "../client/build/");
  app.use(express.static(client_directory));

  app.use(upload.array());

  // Ensure routing for /* (except api) is passed to React Router
  app.get("*", (req, res) => {
    res.sendFile(path.join(client_directory, "index.html"));
  });

  app.listen(PORT, function () {
    console.error(
      `Node ${
        isDev ? "dev server" : "cluster worker " + process.pid
      }: listening on port ${PORT}`
    );
  });
}
