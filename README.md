# EventManager
[![Build Status](https://travis-ci.org/nzediegwu1/EventManager.svg?branch=develop)](https://travis-ci.org/nzediegwu1/EventManager) [![Coverage Status](https://coveralls.io/repos/github/nzediegwu1/EventManager/badge.svg?branch=develop)](https://coveralls.io/github/nzediegwu1/EventManager?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/8413c3ad5cdf27f79e38/maintainability)](https://codeclimate.com/github/nzediegwu1/EventManager/maintainability)

Given you manage an events center, this app will help you accept applications to use your center/facilities, and will either decline events when the proposed day is already taken, or suggest an available day

###### App's Link: https://eventmanager29.herokuapp.com 
<hr>

## TECHNOLOGIES USED

  * Front-end: React/Redux + Bootstrap (Yet to be Implemented)
  * Back-end: Node/Expressjs + Sequelize/Postgres
  * Libraries: nodemon, Babel, eslint, etc.
  * Test: Mocha/Chai


## Setup guide: Clone this repository. To install all dependencies, run;



``` npm install  ```



To start server, run:



``` npm run start:dev  ```



To test, run:



``` npm test  ```

## API ENDPOINTS
<hr>
<table>
  <tr>
      <th>Request</th>
      <th>End Point</th>
      <th>Action</th>
	  <th>Test Data</th>
  </tr>
     <tr>
      <td>POST</td>
      <td>/api/v1/users/</td>
      <td>Signup New User</td>
	  <td>
	  	   {
		username: 'nzediegwu1'
        name: 'Anaeze Nsoffor',
        email: 'nzediegwu1@gmail.com',
        phoneNo: '2347067256519',
        accountType: admin, <pre> // ['admin' or 'regular']</pre>
        password: 'password1',
		confirmPassword: 'password1'
	   }
	  </td>
  </tr>
    </tr>
     <tr>
      <td>POST</td>
      <td>/api/v1/users/login</td>
      <td>Signin Existing User</td>
	  <td>
	  	   {
		username: 'nzediegwu1'
        password: 'password1',
	   }
	  </td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/events/</td>
      <td>Creates New Event</td>
	  <td>
	  {
        title: 'Andela Bootcamp',
        date: 'March 21, 2012',
        time: '8:30',
        venue: 'Andela Epic Tower',
        description: 'A technology learning program',
		centerId: 2,
		token: 'shjdhfjshdfjd' <pre> // token from user signin/signup</pre>
	   }
	  </td>
  </tr>  
  <tr>
      <td>PUT</td>
      <td>/api/v1/events/<eventId> </td>
      <td>Edit an event</td>
	  <td>
	  	  {
        title: 'Andela Bootcamp',
        date: 'March 21, 2012',
        time: '8:30',
        venue: 'Andela Epic Tower',
        description: 'A technology learning program',
		centerId: 2,
		token: 'shjdhfjshdfjd' <pre> // token from user signin/signup</pre>
	   }
	  </td>
  </tr>
  
  <tr>
      <td>DELETE</td>
      <td>/api/v1/events/<eventId></td>
      <td>Delete an event</td>
	  <td>
	  {
		token: 'shjdhfjshdfjd' <pre> // token from user signin/signup</pre>
	  }
	  </td>
  </tr>
  
  <tr>
      <td>GET</td>
      <td>/api/v1/events/</td>
      <td>Get all events</td>
	  <td></td>
  </tr>
   <tr>
      <td>POST</td>
      <td>/api/v1/centers/</td>
      <td>Add a new center</td>
	  <td>
	   {
        name: 'Eagle square',
        address: 'Ikorodu Road',
        location: 'Lagos',
        capacity: '1000',
        price: '25000',
		token: 'shjdhfjshdfjd' <pre> // token from user signin/signup</pre>
	   }
	  </td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/centers/</td>
      <td>Get all centers</td>
	  <td></td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/centers/<centerId></td>
      <td>Get a single center</td>
	  <td></td>
  </tr>
   <tr>
      <td>PUT</td>
      <td>/api/v1/centers/<centerId></td>
      <td>Modify the details of center</td>
	  <td>
	  	   {
        name: 'Eagle square',
        address: 'Ikorodu Road',
        location: 'Lagos',
        capacity: '1000',
        price: '25000',
		token: 'shjdhfjshdfjd' <pre> // token from user signin/signup</pre>
	   }
	  </td>
  </tr>
</table>
