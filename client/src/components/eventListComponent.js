import React from 'react';
import { TableHead, TableRow } from './table';
import { Link } from 'react-router-dom';
import { populateEvents, setEventDetail } from '../actions/eventActions';
import { setDataCount, setActivePage } from '../actions/pageActions';
import { connect } from 'react-redux';
import { getAll, searchFunction } from '../services';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import { LIMIT } from '../constants/actionTypes';
import { Filter } from './filterComponent';

const mapDispatchToProps = dispatch => ({
  populateEvents: events => dispatch(populateEvents(events)),
  setEventDetail: event => dispatch(setEventDetail(event)),
  setDataCount: count => dispatch(setDataCount(count)),
  setActivePage: pageNumber => dispatch(setActivePage(pageNumber)),
});
const mapStateToProps = state => ({
  events: state.events.eventList,
  dataCount: state.page.dataCount,
  activePage: state.page.activePage,
});

export class Events extends React.Component {
  componentWillMount() {
    getAll(this.props, 'events');
  }

  searchEvents = e => {
    searchFunction(e, 'eventTable');
  };

  handlePageChange = pageNumber => {
    this.props.setActivePage(pageNumber);
    getAll(this.props, 'events', pageNumber);
  };

  render() {
    return (
      <div className="mx-sm-auto col-sm-11">
        <b className="page-header">Events</b>
        <Filter placeholder="Filter by title or venue..." handleSearch={this.searchEvents} />
        <div className="table-responsive">
          <table id="eventTable" className="table table-hover table-main">
            <TableHead
              columns={['View', 'Title', 'Venue', 'Date']}
              class="table-header table-header-main"
            />
            <tbody>
              {this.props.events.map(event => (
                <TableRow
                  key={event.id}
                  columns={[
                    <img
                      key="eventImage2839j"
                      className="center-image"
                      src={`${event.picture}`}
                      alt="event-view"
                    />,
                    <b key="eventstatus2839j" onClick={() => this.props.setEventDetail(event)}>
                      <Link className="event-detail" to={`${this.props.match.path}/${event.id}`}>
                        {event.center.availability !== 'close' ? (
                          event.title
                        ) : (
                          <p className="rejected">{event.title} (closed)</p>
                        )}
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
            activePage={this.props.activePage}
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
  activePage: PropTypes.number,
  dataCount: PropTypes.number,
  setActivePage: PropTypes.func,
};
