# EventManager
[![Build Status](https://travis-ci.org/nzediegwu1/EventManager.svg?branch=develop)](https://travis-ci.org/nzediegwu1/EventManager) [![Coverage Status](https://coveralls.io/repos/github/nzediegwu1/EventManager/badge.svg)](https://coveralls.io/github/nzediegwu1/EventManager) [![Maintainability](https://api.codeclimate.com/v1/badges/8413c3ad5cdf27f79e38/maintainability)](https://codeclimate.com/github/nzediegwu1/EventManager/maintainability)

Given you manage an events center, this app will help you accept applications to use your center/facilities, and will either decline events when the proposed day is already taken, or suggest an available day

<b>App's Link: https://eventmanager29.herokuapp.com </b>: 

<h3>TECHNOLOGIES USED</h3>
<hr>
<ul>
  <li>Front-end: React/Redux + Bootstrap (Yet to be Implemented)</li>
  <li>Back-end: Node/Expressjs + Sequelize/Postgres</li>
  <li>Libraries: nodemon, Babel, eslint, etc.</li>
  <li>Test: Mocha/Chai</li>
</ul>

<h3>API ENDPOINTS</h3>
<hr>
<table>
  <tr>
      <th>Request</th>
      <th>End Point</th>
      <th>Action</th>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/events/</td>
      <td>Creates New Event</td>
  </tr>  
  <tr>
      <td>PUT</td>
      <td>/api/v1/events/<eventId> </td>
      <td>Edit an event</td>
  </tr>
  
  <tr>
      <td>DELETE</td>
      <td>/api/v1//events/<eventId></td>
      <td>Delete an event</td>
  </tr>
  
  <tr>
      <td>GET</td>
      <td>/api/v1/recipes/</td>
      <td>Get all recipes</td>
  </tr>
   <tr>
      <td>POST</td>
      <td>/api/v1/centers/</td>
      <td>Add a new center</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1//centers/</td>
      <td>Get all centers</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/centers/<centerId></td>
      <td>Get a single center</td>
  </tr>
   <tr>
      <td>PUT</td>
      <td>/api/v1/centers/<centerId></td>
      <td>Modify the details of center</td>
  </tr>
   <tr>
      <td>GET</td>
      <td>/api/v1/events</td>
      <td>Get all events</td>
  </tr>
</table>

