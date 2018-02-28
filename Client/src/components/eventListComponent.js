import React, { Component } from 'react';
import { TableHead, TableRow } from './table';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { populateEvents, setEventDetail } from '../actions/eventActions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
  return {
    populateEvents: events => dispatch(populateEvents(events)),
    setEventDetail: event => dispatch(setEventDetail(event))
  };
};
const mapStateToProps = state => {
  return {
    events: state.events.eventList,
  };
};

export class Events extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    axios.get('http://localhost:8080/api/v1/events')
      .then(res => {
        this.props.populateEvents(res.data.data);
      }).catch(err => {
        alert(err);
      });
  }
  render() {
    const content = (
      <div className="mx-sm-auto col-sm-11">
        <b className="page-header" >Events</b>
        <ul className="nav nav-pills flex-column">
          <li className="list-group-item sidebar-header text-center">
            <input className="form-control search-input search-list" type="search" placeholder="Filter" aria-label="Search" />
          </li>
        </ul>
        <div className="table-responsive" >
          <table className="table table-hover table-main">
            <TableHead colNumber={4} columns={['View', 'Title', 'Venue', 'Date']} class='table-header table-header-main' />
            <tbody>
              {this.props.events.map(event => (
                <TableRow key={event.id} colNumber={4} columns={[
                  <img className="center-image" src={`http://localhost:8080/public/events/${event.picture}`} alt="event-view" />,
                  <b onClick={() => this.props.setEventDetail(event)}><Link className='event-detail' to={`${this.props.match.path}/${event.id}`}>{event.title}</Link></b>,
                  `${event.center.name}, ${event.center.address}`,
                  new Date(event.date).toDateString()
                ]} />
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