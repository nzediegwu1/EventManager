import React, { Component } from 'react';
import { TableHead } from './tableHead';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { populateEvents } from '../actions/eventActions';
import { connect } from 'react-redux';

const EventRow = (props) => {
  const content = (
    <tr id={props.id} className="event" >
      <td><img className="center-image" src={props.image} alt="event-view" /></td>
      <td><Link className='event-detail' to={props.url}>{props.title}</Link></td>
      <td>{props.location}</td>
      <td>{props.date}</td>
    </tr>
  );
  return content;
}
const mapStateToProps = state => {
  return {
    events: state.events.eventList,
  };
};

const mapDispatchToProps = dispatch => {
  return { populateEvents: events => dispatch(populateEvents(events)) };
};

export class Events extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    axios.get('http://localhost:8000/api/v1/events')
    .then(res => {
      this.props.populateEvents(res.data.data);
    }).catch(err => {
      alert(err);
    })
  }

  render() {
    const content = (
      <div className="mx-sm-auto col-sm-11">
        <b className="page-header">Events</b>
        <ul className="nav nav-pills flex-column">
          <li className="list-group-item sidebar-header text-center">
            <input className="form-control search-input search-list" type="search" placeholder="Filter" aria-label="Search" />
          </li>
        </ul>
        <div className="table-responsive" >
          <table className="table table-hover table-main">
            <TableHead col1='View' col2='Title' col3='Location' col4='Date' />
            <tbody>
              {this.props.events.map(event => (
                <EventRow key={event.id} id={event.id} url='/dashboard/manage-event' title={event.title} image={`http://localhost:8000/public/${event.picture}`} location={`${event.center.name}, ${event.center.address}`} date={new Date(event.date).toDateString()} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
    return content;
  }
}
export const EventList = connect(mapStateToProps, mapDispatchToProps)(Events);