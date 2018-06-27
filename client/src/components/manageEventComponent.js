import React from 'react';
import Icon from './icon';
import { ManageDetailsHeader } from './manageDetailsHeader';
import { connect } from 'react-redux';
import { setEventDetail } from '../actions/eventActions';
import { setPage } from '../actions/pageActions';
import { TableRow } from './table';
import { apiLink, getOne, Transactions } from '../services';
import PropTypes from 'prop-types';

const mapDispatchToProps = dispatch => ({
  setEventDetail: event => dispatch(setEventDetail(event)),
  setPage: page => dispatch(setPage(page)),
});

const mapStateToProps = state => ({
  eventDetails: state.events.event,
});
class ManageEventComponent extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
    this.loggedInUser = JSON.parse(localStorage.token).id;
  }
  componentWillMount() {
    getOne(this.props, this.id, 'events');
  }
  componentWillUnmount() {
    this.props.setPage('dashboard');
  }

  // Handle approval or rejection of event
  approve = e => {
    const transactions = new Transactions(this.props, 'event');
    const event = this.props.eventDetails[0];
    const value = e.target.checked;
    const status = value === true ? 'approved' : 'rejected';
    const itemId = this.props.match.params.id;
    const data = {
      date: new Date(event.date).toDateString(),
      time: new Date(event.date).toLocaleTimeString(),
      status,
      centerId: event.centerId,
    };
    transactions.addOrUpdate(itemId, data);
  };
  render() {
    const event = this.props.eventDetails[0];
    if (!event || !apiLink) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    }
    return (
      <div className="card mx-sm-auto col-sm-11 zero-padding">
        <div className="card-header mg-event-header card-header-body">
          <ManageDetailsHeader
            history={this.props.history}
            param={this.id}
            title={event.title}
            editModal="#addNewEvent"
          />
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-5">
              <img className="card-image" src={`${event.picture}`} alt="eventImage" />
            </div>
            <div className="col-sm-7">
              <div className="table-responsive">
                <table
                  style={{ border: 'none' }}
                  className="table table-hover table-striped table-bordered"
                >
                  <tbody className="thick">
                    <TableRow columns={['Description', event.description]} />
                    <TableRow
                      columns={[
                        'Venue',
                        event.center.availability === 'close' ? (
                          <p className="rejected">
                            {event.center.name}, {event.center.address}, {event.center.location}
                            &nbsp;(closed)
                          </p>
                        ) : (
                          `${event.center.name}, ${event.center.address}, ${event.center.location}`
                        ),
                      ]}
                    />
                    <TableRow columns={['By', event.user.name]} />
                    <TableRow columns={['Contact', event.user.email]} />
                    {/* eslint-disable */}
                    {
                      <TableRow
                        columns={[
                          'Status',
                          event.center.userId === this.loggedInUser ? (
                            <div className="form-group">
                              <span className="switch switch-sm">
                                <input
                                  onChange={this.approve}
                                  type="checkbox"
                                  checked={event.status === 'approved' ? 'checked' : false}
                                  className="switch"
                                  id="switch-sm"
                                />
                                <label htmlFor="switch-sm">
                                  {event.status === 'approved' ? (
                                    'Approved'
                                  ) : (
                                    <p className="rejected">Rejected</p>
                                  )}
                                </label>
                              </span>
                            </div>
                          ) : event.status === 'approved' ? (
                            'Approved'
                          ) : (
                            <p className="rejected">Rejected</p>
                          ),
                        ]}
                      />
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer text-muted mg-event-header">
          <div className="row text-white">
            <div className="col-sm-6">
              <Icon class="invert-color" src="glyphicons-46-calendar.png" alt="date" /> Date:{' '}
              {new Date(event.date).toDateString()}
            </div>
            <div className="col-sm-6">
              <Icon class="invert-color" src="glyphicons-54-alarm.png" alt="time" /> Start Time:{' '}
              {new Date(event.date).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export const ManageEvent = connect(mapStateToProps, mapDispatchToProps)(ManageEventComponent);
ManageEventComponent.propTypes = {
  match: PropTypes.object,
  setPage: PropTypes.func,
  eventDetails: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.object,
};
