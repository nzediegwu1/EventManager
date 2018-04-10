import React, { Component } from 'react';
import calenderIcon from '../resources/images/glyphicons-46-calendar.png';
import timeIcon from '../resources/images/glyphicons-54-alarm.png';
import { ManageDetailsHeader } from './manageDetailsHeader';
import { connect } from 'react-redux';
import axios from 'axios';
import { setEventDetail } from '../actions/eventActions';
import { setPage } from '../actions/pageActions';
import { TableRow } from './table';
import { apiLink, logout } from '../reusables';

const mapDispatchToProps = dispatch => ({
  setEventDetail: event => dispatch(setEventDetail(event)),
  setPage: page => dispatch(setPage(page)),
});

const mapStateToProps = state => ({
  eventDetails: state.events.event,
});
class ManageEventComponent extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
    this.approve = this.approve.bind(this);
    this.loggedInUser = JSON.parse(localStorage.token).id;
  }
  componentWillMount() {
    axios
      .get(`${apiLink}/api/v1/events/${this.id}`)
      .then(res => {
        this.props.setEventDetail(res.data.data);
        this.props.setPage('manageEvent');
      })
      .catch(err => {
        err.response.status === 500
          ? alert(err.response.data.message.name)
          : alert(err.response.data.message);
        (err.response.status === 404 || err.response.status === 400) &&
          this.props.history.push('/dashboard');
      });
  }
  componentWillUnmount() {
    this.props.setPage('dashboard');
  }
  approve(e) {
    const event = this.props.eventDetails[0];
    const token = JSON.parse(localStorage.token).value;
    const value = e.target.checked;
    const status = value === true ? 'approved' : 'rejected';
    const data = {
      date: new Date(event.date).toDateString(),
      time: new Date(event.date).toLocaleTimeString(),
      status,
      centerId: event.centerId,
    };
    axios
      .put(`${apiLink}/api/v1/events/approve/${this.props.match.params.id}?token=${token}`, data)
      .then(res => {
        this.props.setEventDetail(res.data.data);
        alert(res.data.data.status);
      })
      .catch(err => {
        typeof err.response.data.message !== 'object' &&
          alert(JSON.stringify(err.response.data.message));
        (err.response.status === 403 || err.response.status === 401) &&
          logout('addNewCenter', this.props.history);
        if (typeof err.response.data.message === 'object') {
          let occupiedDates = '';
          err.response.data.message.OccupiedDates.forEach(date => {
            occupiedDates += `${new Date(date).toDateString()}\n`;
          });
          alert(
            `MESSAGE:\n${err.response.data.message.Sorry}\n\nSELECTED DATES:\n${occupiedDates}`
          );
          occupiedDates = '';
        }
      });
  }
  render() {
    const event = this.props.eventDetails[0];
    if (!event || !apiLink) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    }
    const content = (
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
                    <TableRow colNumber={2} columns={['Description', event.description]} />
                    <TableRow
                      colNumber={2}
                      columns={[
                        'Venue',
                        `${event.center.name}, ${event.center.address}, ${event.center.location}`,
                      ]}
                    />
                    <TableRow colNumber={2} columns={['By', event.user.name]} />
                    <TableRow colNumber={2} columns={['Contact', event.user.email]} />
                    {
                      <TableRow
                        colNumber={2}
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
                                <label htmlFor="switch-sm">Approve</label>
                              </span>
                            </div>
                          ) : (
                            event.status
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
              <img className="invert-color" src={calenderIcon} /> Date:{' '}
              {new Date(event.date).toDateString()}
            </div>
            <div className="col-sm-6">
              <img className="invert-color" src={timeIcon} /> Start Time:{' '}
              {new Date(event.date).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    );
    return content;
  }
}
export const ManageEvent = connect(mapStateToProps, mapDispatchToProps)(ManageEventComponent);
