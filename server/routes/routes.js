const router = require("express").Router();

// TODO: add more routes

const userRouter = require("./user.route");
const portfolioRouter = require("./portfolio.route");

router.use("/user", userRouter);
router.use("/users", require("../controllers/user.controller").getAllUsers);

router.get("/", (req, res) => {
  res.set("Content-Type", "application/json");
  res.send('{"message": "Hello from express!"}');
});

router.use("/portfolios", portfolioRouter);

module.exports = router;
