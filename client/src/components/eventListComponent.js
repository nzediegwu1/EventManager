import React from 'react';
import { TableHead, TableRow } from './table';
import { Link } from 'react-router-dom';
import { populateEvents, setEventDetail } from '../actions/eventActions';
import { setDataCount } from '../actions/pageActions';
import { connect } from 'react-redux';
import { getAll } from '../services';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import { LIMIT } from '../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  populateEvents: events => dispatch(populateEvents(events)),
  setEventDetail: event => dispatch(setEventDetail(event)),
  setDataCount: count => dispatch(setDataCount(count)),
});
const mapStateToProps = state => ({
  events: state.events.eventList,
  dataCount: state.page.dataCount,
});

export class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentWillMount() {
    getAll(this.props, 'events');
  }

  handlePageChange(pageNumber) {
    this.setState({
      activePage: pageNumber,
    });
    getAll(this.props, 'events', pageNumber);
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
              {/* eslint-disable */}
              {console.log('this.props.events', this.props.events)}
              {this.props.events.map(event => (
                <TableRow
                  key={event.id}
                  columns={[
                    <img className="center-image" src={`${event.picture}`} alt="event-view" />,
                    <b onClick={() => this.props.setEventDetail(event)}>
                      <Link className="event-detail" to={`${this.props.match.path}/${event.id}`}>
                        {event.center.availability !== 'close' ? event.title : <p className="rejected">{event.title} (closed)</p>}
                      </Link>
                    </b>,
                    `${event.center.name}, ${event.center.address}`,
                    new Date(event.date).toDateString(),
                  ]}
                />
              ))}
            </tbody>
          </table>
          <br />
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={LIMIT}
            totalItemsCount={this.props.dataCount}
            pageRangeDisplayed={3}
            onChange={this.handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      </div>
    );
  }
}
export const EventList = connect(mapStateToProps, mapDispatchToProps)(Events);
Events.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.object,
  setEventDetail: PropTypes.func,
};
