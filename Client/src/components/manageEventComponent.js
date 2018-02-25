import React, { Component } from 'react';
import calenderIcon from '../resources/images/glyphicons-46-calendar.png';
import timeIcon from '../resources/images/glyphicons-54-alarm.png';
import { ManageDetailsHeader } from './manageDetailsHeader';
import { connect } from 'react-redux';
import axios from 'axios';
import { setEventDetail, changePage } from '../actions/eventActions';

const mapDispatchToProps = dispatch => {
  return {
    setEventDetail: event => dispatch(setEventDetail(event)),
    changePage: page => dispatch(changePage(page))
  };
};

const mapStateToProps = state => {
  return {
    eventDetails: state.events.event
  };
};
class ManageEventComponent extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    axios.get(`http://localhost:8000/api/v1/events/${this.props.match.params.id}`)
      .then(res => {
        this.props.setEventDetail(res.data.data);
        this.props.changePage('manageEvent');        
      }).catch(err => {
        alert(err.response.data.message);
        (err.response.status === 404 || err.response.status === 400) && this.props.history.push('/dashboard');
      })
  }
  componentWillUnmount(){
    this.props.changePage('dashboard');
  }
  render() {
    const event = this.props.eventDetails[0];
    if (event === undefined) {
      return <div><h2>Loading...</h2></div>
    }
    const content = (
      <div className="card mx-sm-auto col-sm-11 zero-padding">
        <div className="card-header mg-event-header card-header-body">
          <ManageDetailsHeader title={event.title} editModal='#addNewEvent' />
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-4">
              <img className="card-image" src={`http://localhost:8000/public/${event.picture}`} alt="eventImage" />
            </div>
            <div className="col-sm-8">
              <h5><b>Description:</b> {event.description}</h5>
              <h5><b>Venue:</b> {`${event.center.name}, ${event.center.address}, ${event.center.location}`}</h5>
              <h5><b>By:</b> {event.user.name}</h5>
              <h5><b>Contact:</b> {event.user.email}</h5>
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