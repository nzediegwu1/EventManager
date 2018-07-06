# EventManager
[![Build Status](https://travis-ci.org/nzediegwu1/EventManager.svg?branch=develop)](https://travis-ci.org/nzediegwu1/EventManager) [![Coverage Status](https://coveralls.io/repos/github/nzediegwu1/EventManager/badge.svg?branch=develop)](https://coveralls.io/github/nzediegwu1/EventManager?branch=develop)
 [![Maintainability](https://api.codeclimate.com/v1/badges/8413c3ad5cdf27f79e38/maintainability)](https://codeclimate.com/github/nzediegwu1/EventManager/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/8413c3ad5cdf27f79e38/test_coverage)](https://codeclimate.com/github/nzediegwu1/EventManager/test_coverage)

Given you manage an events center, this app will help you accept applications to use your center/facilities for events, and will either decline events when the proposed day is already taken, or suggest an available day

<hr>

### Table of Contents

1. Features
2. Technologies
2. Installation and Setup
3. Testing the application
4. Documentation
5. Limitations
6. How To Contribute

## Features

#### Users
Users can perform the following actions with the application
  - Create documents
  - Edit documents
  - Delete documents
  - View documents
  - Search for documents (Private, Public and Role)
  - View All Documents (All Documents)

Admin can perform all users actions and the following actions
  - Search for Users
  - Search for documents

Super Admin can perform all admin and users actions and the following actions
  - Create Roles
  - View Roles

#### Documents
A single document has the following properties
  - Title
  - Content
  - Access right : Private (default), Public and Role
  - User ID

#### Roles
The application contains 3 roles by default
  - SuperAdmin
  - Admin
  - User
  
## Technologies
  ### Client
    * Bootstrap 4: For UI styling
    * React: For rapid front-end web developement
    * Redux: For state management
    * SASS: For custom styling
    * Webpack: For bundling, running tasks and load-time optimization

  ### Server
    * Nodejs for server-side logic
    * Express for api routes implementation
    * Json Web Tokens for session authentication
    * Postgresql & Sequelize for database management
    * Heroku for hosting services

  ### Continuous Integration
    * Travis CI & Codeclimate for test automation
    * Coveralls for test coverage report
    * Hounds CI for linting report

  ### Test
    * Mocha & Chai for api route testing
    * Jest & Enzyme for UI testing
    * Nightwatch & Selenium for end-to-end testing



## Installation and Setup
    * Install [Nodejs](https://nodejs.org/en/download/) and [Postgres SQL](https://www.postgresql.org/download/)
    * Clone this repo ``` git clone https://github.com/nzediegwu1/EventManager.git ```
    * Run ``npm install`` to install dependencies
    * Create Postgresql database and run migrations `npm run db:migrations`.
    * Create a `.env` file by using the sample env file `.env.sample` in the root directory of the application. Use a different database for your testing and development.
  
## Available Task Runners
  ### Production
  
    * npm start → for starting the server on Heroku; transpiles, bundles and runs the full application

  ### Development
    * npm run start:dev →  transpiles and runs the server on the fly, watches for file change and recompile
    * npm run client → bundles the react project on the fly, watches for file changes, rebundles and reloads HMR server
    
  ### Finally
    * Navigate to http://localhost:8080/


  ### Testing the Application
    *  npm test →  run API tests
    *  npm run test:e2e → Runs end-to-end unit tests
    *  npm run test:react → Runs frontend tests

## Documentation

The API was documented using swagger. To view, click [here](http://eventmanageronline.herokuapp.com/api-docs/)


## Limitations
1. Superadmin cannot customize a new role
2. The number of people that view a public document is tracked.

## How to Contribute
To contribute to the project, follow the instructions below
 1. **Fork** the repo on GitHub
 2. **Clone** the project to your own machine
 3. **Commit** changes to your own branch
 4. **Push** your work back up to your fork
 5. Submit a **Pull request** so that I can review your changes

NOTE: Be sure to merge the latest from "upstream" before making a pull request!

## Licence
This project is licensed under the [MIT License](https://swaggerhub.com/apis/nzediegwu1/EventsManager/1.0.0)
