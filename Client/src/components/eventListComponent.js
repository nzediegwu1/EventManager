import React, { Component } from 'react';
import romeImage from '../resources/images/rome.jpg';
import hongkongImg from '../resources/images/hongkong.jpg';
import templeImgage from '../resources/images/temple.jpg';
import beijingImg from '../resources/images/beijing.jpg';
import { TableHead } from './tableHead';

const EventRow = (props) => {
  const content = (
    <tr className="event">
      <td><img className="center-image" src={props.image} alt="event-view" /></td>
      <td>{props.title}</td>
      <td>{props.location}</td>
      <td>{props.date}</td>
    </tr>
  );
  return content;
}

export class EventList extends Component {

  render() {
    const content = (
      <div className="mx-sm-auto col-sm-11">
        <b className="page-header">My Events</b>
        <ul className="nav nav-pills flex-column">
          <li className="list-group-item sidebar-header text-center">
            <input className="form-control search-input search-list" type="search" placeholder="Filter" aria-label="Search" />
          </li>
        </ul>
        <div className="table-responsive">
          <table className="table table-hover table-main">
            <TableHead col1='View' col2='Title' col3='Location' col4='Date' />
            <tbody>
              <EventRow title='World Programmers forum' image={romeImage} location='Rome, Italy' date='5th Dec, 2017' />
              <EventRow title='Andela Bootcamp' image={hongkongImg} location='Epic Andela Tower, Lagos' date='20th Nov, 2017' />
              <EventRow title='PSquare Concert' image={templeImgage} location='Istambul, turkey' date='25th Dec, 2017' />
              <EventRow title='WHO international convention' image={beijingImg} location='Beijing, China' date='4th Jan, 2018' />
            </tbody>
          </table>
        </div>
      </div>
    );
    return content;
  }
}