# EventManager
[![Build Status](https://travis-ci.org/nzediegwu1/EventManager.svg?branch=develop)](https://travis-ci.org/nzediegwu1/EventManager) [![Coverage Status](https://coveralls.io/repos/github/nzediegwu1/EventManager/badge.svg?branch=develop)](https://coveralls.io/github/nzediegwu1/EventManager?branch=develop)
 [![Maintainability](https://api.codeclimate.com/v1/badges/8413c3ad5cdf27f79e38/maintainability)](https://codeclimate.com/github/nzediegwu1/EventManager/maintainability)

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
	<pre>{
	username: 'nzediegwu1'
	name: 'Anaeze Nsoffor',
	email: 'nzediegwu1@gmail.com',
	phoneNo: '2347067256519',
	accountType: admin,//['admin' or 'regular']
	password: 'password1',
	confirmPassword: 'password1'
     }</pre>
     </td>
  </tr>
    </tr>
     <tr>
      <td>POST</td>
      <td>/api/v1/users/login</td>
      <td>Signin Existing User</td>
      <td>
	<pre>{
	username: 'nzediegwu1'
	password: 'password1',
      }</pre>
      </td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/events/</td>
      <td>Creates New Event</td>
      <td>
      <pre>{
	title: 'Andela Bootcamp',
	date: 'March 21, 2012',
	time: '8:30',
	venue: 'Andela Epic Tower',
	description: 'A technology learning program',
	centerId: 2,
	token: 'shjdhfjshdfjd'//token from user signin/signup
     }</pre>
     </td>
  </tr>  
  <tr>
      <td>PUT</td>
      <td>/api/v1/events/<eventId> </td>
      <td>Edit an event</td>
      <td>
      <pre>{
	title: 'Andela Bootcamp',
	date: 'March 21, 2012',
	time: '8:30',
	venue: 'Andela Epic Tower',
	description: 'A technology learning program',
	centerId: 2,
	token: 'shjdhfjshdfjd'
     }</pre>
     </td>
  </tr>
  
  <tr>
      <td>DELETE</td>
      <td>/api/v1/events/<eventId></td>
      <td>Delete an event</td>
      <td>
      <pre>{
	token: 'shjdhfjshdfjd'
      }</pre> 
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
      <pre>{
	name: 'Eagle square',
	address: 'Ikorodu Road',
	location: 'Lagos',
	capacity: '1000',
	price: '25000',
	token: 'shjdhfjshdfjd'
      }</pre>
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
      <pre>{
	name: 'Eagle square',
	address: 'Ikorodu Road',
	location: 'Lagos',
	capacity: '1000',
	price: '25000',
	token: 'shjdhfjshdfjd'
      }</pre>
      </td>
  </tr>
</table>
## Licence
Copyright (c) 2017 Haruna Popoola

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
