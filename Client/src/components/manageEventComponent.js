import React, { Component } from 'react';
import calenderIcon from '../resources/images/glyphicons-46-calendar.png';
import timeIcon from '../resources/images/glyphicons-54-alarm.png';
import { ManageDetailsHeader } from './manageDetailsHeader';
import { connect } from 'react-redux';
import axios from 'axios';
import { setEventDetail } from '../actions/eventActions';
import { setPage } from '../actions/pageActions';
import { TableRow } from './table';

const mapDispatchToProps = dispatch => {
  return {
    setEventDetail: event => dispatch(setEventDetail(event)),
    setPage: page => dispatch(setPage(page))
  };
};

const mapStateToProps = state => {
  return {
    eventDetails: state.events.event,
  };
};
class ManageEventComponent extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    axios.get(`http://localhost:8080/api/v1/events/${this.props.match.params.id}`)
      .then(res => {
        this.props.setEventDetail(res.data.data);
        this.props.setPage('manageEvent');
      }).catch(err => {
        err.response.status === 500 ? alert(err.response.data.message.name) :
          alert(err.response.data.message);
        (err.response.status === 404 || err.response.status === 400) && this.props.history.push('/dashboard');
      })
  }
  componentWillUnmount() {
    this.props.setPage('dashboard');
  }
  render() {
    const event = this.props.eventDetails[0];
    if (event === undefined) {
      return <div><h2>Loading...</h2></div>
    }
    const content = (
      <div className="card mx-sm-auto col-sm-11 zero-padding">
        <div className="card-header mg-event-header card-header-body">
          <ManageDetailsHeader history={this.props.history} param={this.props.match.params.id} title={event.title} editModal='#addNewEvent' />
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-5">
              <img className="card-image" src={`http://localhost:8080/public/events/${event.picture}`} alt="eventImage" />
            </div>
            <div className="col-sm-7">
              <div className="table-responsive">
                <table style={{ border: 'none' }} className="table table-hover table-striped table-bordered">
                  <tbody className='thick'>
                    <TableRow colNumber={2} columns={['Description', event.description]} />
                    <TableRow colNumber={2} columns={['Venue', `${event.center.name}, ${event.center.address}, ${event.center.location}`]} />
                    <TableRow colNumber={2} columns={['By', event.user.name]} />
                    <TableRow colNumber={2} columns={['Contact', event.user.email]} />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer text-muted mg-event-header">
          <div className="row text-white">
            <div className="col-sm-6">
              <img className="invert-color" src={calenderIcon} /> Date: {new Date(event.date).toDateString()}
            </div>
            <div className="col-sm-6">
              <img className="invert-color" src={timeIcon} /> Start Time: {new Date(event.date).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    );
    return content;
  }
}
export const ManageEvent = connect(mapStateToProps, mapDispatchToProps)(ManageEventComponent);