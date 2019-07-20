# REST API (Tree house FSJS unit-09)

## Table of Contents

- [Description](#description)
- [Overview of Project Files Provided by Tree House](#overview-of-project-files-by-tree-house)
- [Running Instructions](#running-instructions)

## Description

The REST API will provide a way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, as well as adding, updating and deleting courses in the database.

In addition, the project require users to create an account and log-in to make changes to the database.

Key technologies used: Node.js, Express.js, bcryptjs, Express Validator, SQLite and sequelizejs.

**Note: this project is under progress**

## Overview of Project Files Provided by Tree House

Some of the important files provided by Tree House to aid in the project has been noted below:

- The `seed` folder contains a starting set of data for the database in the form of a JSON file (`data.json`) and a collection of files (`context.js`, `database.js`, and `index.js`) that can be used to create the app's database and populate it with data
- The `app.js` file configures Express to serve a simple REST API. It also configured the `morgan` npm package to log HTTP requests/responses to the console. **Note: it is just a starting point and I added to this file and other files with the routes and models for the API**
- The `nodemon.js` file configures the nodemon Node.js module, which is used to run the REST API.
- The `package.json` file (and the associated `package-lock.json` file) contain the project's npm configuration, which includes the some of the starting project dependencies.
- The `RESTAPI.postman_collection.json` file is a collection of Postman requests that can be used to test and explore the REST API.

## Running Instructions

1. Download or clone the repository
2. Open Terminal in the project directory
3. Run `npm install` to install dependencies
4. Run `npm run seed` to seed the SQLite database
5. Run `npm start` to start the node application
6. Use Postman to test the rest api routes at [http://localhost:5000/](http://localhost:5000)

**_Note: Requires Node.js and npm_**
