# Camel Pages by camel_case
Project for COMP30022 IT Project 2020 Semester 2 (Umair's Team 1)

<img src="client/src/svg/camel.svg" alt="drawing" width="100"/>

[![Heroku App Status](http://heroku-shields.herokuapp.com/camelcase-itproject)](https://camelcase-itproject.herokuapp.com)
[![Storybook](https://camo.githubusercontent.com/4c64e07178937065fd61d9ba90de13291394dd56/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f73746f7279626f6f6b6a732f6272616e64406d61737465722f62616467652f62616467652d73746f7279626f6f6b2e737667)](https://5f61a7e9e0a12400222c3299.chromatic.com/)
![GitHub Actions CI](https://github.com/exradr/itproject2020/workflows/Node.js%20CI/badge.svg)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/85274d2bb2c94685a95b3900f9c9d9ab)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=exradr/itproject2020&amp;utm_campaign=Badge_Grade)

# Table of Contents

- [Project Background](#project-background)
  * [Description](#description)
  * [Criteria](#criteria)
  * [Team Members](#team-members)
  * [Required Features](#required-features)
  * [Additional Features](#additional-features)
  * [Documentation](#documentation)
- [Camel Pages](#camel-pages)
  * [System Requirements](#system-requirements)
  * [Project Link](#project-link)
- [Installation](#installation)
- [Version History](#version-history)

<!-- toc -->

# Project Background
### Description
Our clients are 4 masters students from the Software Processes and Management (SWEN90016) subject.  

As university students, they wanted a place to present their work, careers and skills; and give them one place they can direct professionals, colleagues, friends and recruiters to learn about them and their work. Importantly, they wanted their portfolios to represent their own individuality, to enable them to stand out from the crowd; and hence be personalisable.

This gave us the following requirements:

### Criteria
- An easy-to-use portfolio creation experience
- Portfolios are easy to customize for individual expression
- Portfolios viewable from browsers and mobile
- Have ways to contact and discover users
- And supporting a variety of media.

### Team Members
| Name                    | Student No | Email                             | GitHub       |
| ----------------------- | ---------- | --------------------------------- | ------------ |
| Tuan Dung (Josh) Nguyen | 941806     | tuann6@student.unimelb.edu.au     | joshnguyen99 |
| Lawrence Leong          | 996300     | lsleong@student.unimelb.edu.au    | Rexrover2    |
| Liam Saliba             | 882039     | lsaliba@student.unimelb.edu.au    | exradr       |
| Chan Jie Ho             | 961948     | chanjieh@student.unimelb.edu.au   | hochanjie    |
| Yung Cheng Kong         | 1026205    | yungchengk@student.unimelb.edu.au | yungchengK   |

**Supervisor**  
Umair Mawani (umawani) / umair.mawani@unimelb.edu.au / umawani@student.unimelb.edu.au

### Required Features
- User management: confirmation, password reset
- Portfolio viewing
- Mobile and desktop viewing
- Rich portfolio elements
- Portfolio customisation with themes, and different layouts.
  * With least 4 types of pre-made portfolio templates
  * So that the user's don't have to worry about coming up with their own themes
- File upload & Media management
- Contact form
- Live editing, with autosave.

### Additional Features
- Email bot
- Google/Facebook login (backend)
- Cookies
- Single-/Multi-page portfolios
- 10-page limit
- Page naming constraints
- Page Completion status
- Media-preview
- Profile pictures
- Social icons

### Documentation
- [Project Scope](docs/project_scope.pdf)
- [User Stories](https://hackmd.io/T_SPAfyVTHyBGaVUakA7kQ?view)
- [Motivational Model](docs/motivational_model.pdf)
- [Architecture Diagram](docs/architecture_diagram.pdf)
- [Database Schema Model](docs/database_schema_model.pdf)
- [User Flow Diagram](docs/user_flow.pdf)
- [API Documentation](docs/api_endpoints.pdf)
- [Chromatic/Storybook](https://www.chromatic.com/library?appId=5f61a7e9e0a12400222c3299)

# Camel Pages  
### System Requirements
* [Heroku](https://www.heroku.com/home)
  * [command-line tools (CLI)](https://toolbelt.heroku.com)
* [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Node.js](https://nodejs.org) (use LTS release)

### Project Link
[Heroku Link](https://camelcase-itproject.herokuapp.com/)
  
# Installation
### Local Development

Because this app is made of two npm projects, there are two places to run `npm` commands:

1. **Node API server** in `server/`
2. **React UI** in `client/` directory.

Test the app:
```
# in root directory
npm run dev
```

Test the built app:
```
# in root directory
npm build
npm start

# to test the whole app
npm test
```

### Run the API (express) server

In a terminal:

```bash
# Change directory first!
cd server

# Initial setup
npm install

# Start the server
npm start

# Test the server
npm test
```

#### Install new npm packages for Server
Note: server and client are *separate*.  `cd` to the correct directory (`/` or `client/`) before doing this.
```bash
cd
npm install package-name --save
```

If the package you want to add is a development package, use the command
```bash
npm install package-name --save-dev
```


### Run the Client (React UI)

The React app is configured to proxy backend requests to the local Node server. (See [`"proxy"` config](client/package.json))

In a separate terminal from the API server, start the UI:

```bash
# Always change directory, first
cd client/

# Initial setup
npm install

# Start the client
npm start

# Test the client
npm test

# To run storybook
npm run storybook
```

#### Install new npm packages for React UI
It's the same as server, just `cd client` first.

### Build react for deployment (testing)
Only needed if you're testing how Heroku will deploy the app.

Within project root `/`
```
# Run Heroku deployment from your own computer
heroku local web
```
At this point, http://localhost:5000 is running the server and api.  You can check http://localhost:5000/api and you'll probably see a JSON file.

But will 404 since the site files are not compiled within the `client/build/` directory.  To get react running locally (as Heroku does it), we need to build it.
```
# Compile react for deployment (will build to `client/build/` and served with `server/` express)
# run this in project root
npm run build
```
The above script can be found in `package.json`.

Now http://localhost:5000 will have the app.  Sweet.

### Deploying to Heroku
There's little reason to do this since `master` will automatically be deployed to Heroku upon any update.
This is here for documentation purposes.
```
# Add heroku as remote (will exist as heroku branch)
heroku git:remote -a camelcase-itproject

# Push branch to heroku
git push heroku master
```

# Version History
- [VERSIONS.md](/VERSIONS.md)
