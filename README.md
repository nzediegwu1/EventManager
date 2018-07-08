# EventManager
[![Build Status](https://travis-ci.org/nzediegwu1/EventManager.svg?branch=develop)](https://travis-ci.org/nzediegwu1/EventManager) [![Coverage Status](https://coveralls.io/repos/github/nzediegwu1/EventManager/badge.svg?branch=develop)](https://coveralls.io/github/nzediegwu1/EventManager?branch=develop)
 [![Maintainability](https://api.codeclimate.com/v1/badges/8413c3ad5cdf27f79e38/maintainability)](https://codeclimate.com/github/nzediegwu1/EventManager/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/8413c3ad5cdf27f79e38/test_coverage)](https://codeclimate.com/github/nzediegwu1/EventManager/test_coverage)

Given you manage an events center, this app will help you accept applications to use your center/facilities for events, and will either decline events when the proposed day is already taken, or suggest an available day

<hr>

## Table of Contents

    1. Features
    2. Technologies
    2. Installation and Setup
    3. Testing the application
    4. Documentation
    5. Limitations
    6. How To Contribute

## Features

  #### Roles
    The application contains 3 roles by default
      - SuperAdmin
      - Admin
      - Regular
  
  #### Users
    All users can perform the following actions with the application
      - Create events
      - Retrieve events
      - Retrieve an event
      - Update own events
      - Delete own events
      - Retrieve centers
      - Retrieve a single center
      - View user profiles
      - Update profile details
      - Upload profile picture
      - Recover lost password
  
    Admin and SuperAdmin can perform the following actions
      - Create centers
      - Modify own Centers
      - Approve event on own center
      - Create/Update/Delete facilities on own center


    Super Admin can perform the following actions
      - Upgrade AccountType/Role of other existing users
      - Retrieve list of all users
  
## Technologies
  ### Client
    1. Bootstrap 4: For UI styling
    2. React: For rapid front-end web developement
    3. Redux: For state management
    4. SASS: For custom styling
    5. Webpack: For bundling and running mundane tasks in development of the Client app

  ### Server
    1. Nodejs for server-side logic
    2. Express for api routes implementation
    3. Json Web Tokens for session authentication
    4. Postgresql & Sequelize for database management
    5. Heroku for hosting services

  ### Continuous Integration
    1. Travis CI & Codeclimate for test automation
    2. Coveralls for test coverage report
    3. Hounds CI for linting report

  ### Test
    1. Mocha & Chai for api route testing
    2. Jest & Enzyme for UI testing
    3. Nightwatch & Selenium for end-to-end testing



## Installation and Setup
    1. Install Nodejs and Postgres SQL
    2. Clone this repo "git clone https://github.com/nzediegwu1/EventManager.git"
    3. Run "npm install" to install dependencies
    4. Create a Postgresql database 
    5. Create a ".env" file and define env variables using the sample file ".env.sample" in the root directory of this project.
    6. Run migrations "npm run db:migrations".
  
  ### Production
  
    1. "npm start" → for starting the server on Heroku: transpiles, bundles and runs the full application

  ### Development
    1. "npm run start:dev" →  transpiles and runs the server on the fly, watches for file change and recompile
    2. "npm run client" → bundles the react project on the fly, watches for file changes, rebundles and reloads HMR server
    
  ### Finally
    Go to http://localhost:8080 on your browser to view app


## Testing the Application
    1. "npm test" →  run API tests
    2. "npm run test:e2e" → Runs end-to-end unit tests
    3. "npm run test:react" → Runs frontend tests

## Documentation

The API was documented using swagger. To view, click [here](http://eventmanageronline.herokuapp.com/api/v1/docs)


## Limitations
    1. User cannot book for an event online
    2. User cannot pay for center booking online
    2. An event cannot span more than one day, user has to create multiple events for multiple days
    3. Cannot upload multiple images for a center/event
    4. User cannot upvote/downvote events or submit rating for centers

## How to Contribute
To contribute to the project, follow the instructions below
 1. **Fork** the repo on GitHub
 2. **Clone** the project to your own machine
 3. **Commit** changes to your own branch
 4. **Push** your work back up to your fork
 5. Submit a **Pull request** so that I can review your changes

**NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## Licence
This project is licensed under the [MIT License](https://github.com/nzediegwu1/EventManager/blob/develop/LICENSE)
