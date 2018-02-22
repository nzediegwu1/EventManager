import React, { Component } from 'react';
import beijingImage from '../resources/images/beijing.jpg';
import calenderIcon from '../resources/images/glyphicons-46-calendar.png';
import timeIcon from '../resources/images/glyphicons-54-alarm.png';
import { ManageDetailsHeader } from './manageDetailsHeader';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    eventDetails: state.events.event
  };
};

class ManageEventComponent extends Component {
  constructor(props) {
    super(props);
    this.eventDetails = this.props.eventDetails;
    console.log(this.eventDetails)
  }
  render() {
    const content = (
      <div className="card mx-sm-auto col-sm-11 zero-padding">
        <div className="card-header mg-event-header card-header-body">
          <ManageDetailsHeader title={this.eventDetails[0].title} editModal='#addNewEvent' />
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-4">
              <img className="card-image" src={`http://localhost:8000/public/${this.eventDetails[0].picture}`} alt="eventImage" />
            </div>
            <div className="col-sm-8">
              <h5><b>Description:</b> {this.eventDetails[0].description}</h5>
              <h5><b>Venue:</b> {`${this.eventDetails[0].center.name}, ${this.eventDetails[0].center.address}, ${this.eventDetails[0].center.location}`}</h5>
              <h5><b>By:</b> {this.eventDetails[0].user.name}</h5>
              <h5><b>Contact:</b> {this.eventDetails[0].user.email}</h5>
            </div>
          </div>
        </div>
        <div className="card-footer text-muted mg-event-header">
          <div className="row text-white">
            <div className="col-sm-6">
              <img className="invert-color" src={calenderIcon} /> Date: {new Date(this.eventDetails[0].date).toDateString()}
            </div>
            <div className="col-sm-6">
              <img className="invert-color" src={timeIcon} /> Start Time: {new Date(this.eventDetails[0].date).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    );
    return content;
  }
}
export const ManageEvent = connect(mapStateToProps)(ManageEventComponent);