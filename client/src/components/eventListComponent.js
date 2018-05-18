import React from 'react';
import { TableHead, TableRow } from './table';
import { Link } from 'react-router-dom';
import { populateEvents, setEventDetail } from '../actions/eventActions';
import { connect } from 'react-redux';
import { getAll } from '../services';

const mapDispatchToProps = dispatch => ({
  populateEvents: events => dispatch(populateEvents(events)),
  setEventDetail: event => dispatch(setEventDetail(event)),
});
const mapStateToProps = state => ({
  events: state.events.eventList,
});

export class Events extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    getAll(this.props, 'events');
  }
  render() {
    return (
      <div className="mx-sm-auto col-sm-11">
        <b className="page-header">Events</b>
        <ul className="nav nav-pills flex-column">
          <li className="list-group-item sidebar-header text-center">
            <input
              className="form-control search-input search-list"
              type="search"
              placeholder="Filter"
              aria-label="Search"
            />
          </li>
        </ul>
        <div className="table-responsive">
          <table className="table table-hover table-main">
            <TableHead
              columns={['View', 'Title', 'Venue', 'Date']}
              class="table-header table-header-main"
            />
            <tbody>
              {this.props.events.map(event => event.center.availability !== 'close' && (
                <TableRow
                  key={event.id}
                  columns={[
                    <img className="center-image" src={`${event.picture}`} alt="event-view" />,
                    <b onClick={() => this.props.setEventDetail(event)}>
                      <Link className="event-detail" to={`${this.props.match.path}/${event.id}`}>
                        {event.title}
                      </Link>
                    </b>,
                    `${event.center.name}, ${event.center.address}`,
                    new Date(event.date).toDateString(),
                  ]}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export const EventList = connect(mapStateToProps, mapDispatchToProps)(Events);
