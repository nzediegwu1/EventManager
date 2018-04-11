import React, { Component } from 'react';
import eventNameIcon from '../resources/images/glyphicons-619-mixed-buildings.png';
import eventImageIcon from '../resources/images/glyphicons-139-picture.png';
import eventDateIcon from '../resources/images/glyphicons-46-calendar.png';
import eventTimeIcon from '../resources/images/glyphicons-54-alarm.png';
import { FormGroup } from './formGroup';
import { ModalHeader } from './modalHeader';
import { Option } from './selectOption';
import axios from 'axios';
import { logout, getCenters, apiLink } from '../reusables';
import { connect } from 'react-redux';
import { setEventDetail } from '../actions/eventActions';
import { populateCenters } from '../actions/centerActions';

const inputAttrs = (inputType, inputName, placeholder, className, ref, required) => ({
  inputType,
  inputName,
  placeholder,
  className,
  ref,
  required,
});

const mapDispatchToProps = dispatch => ({
  setEventDetail: event => dispatch(setEventDetail(event)),
  populateCenters: centers => dispatch(populateCenters(centers)),
});
const mapStateToProps = state => ({
  modalTitle: state.page.modalTitle,
  eventDetails: state.events.event,
  eventDefaults: state.page.eventDefaults,
  centers: state.centers.centerList,
});
let eventId;
class AddEventComponent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.folder = apiLink === 'http://localhost:8080' ? 'dev/events' : 'prod/events';
  }
  componentWillMount() {
    getCenters(axios, this.props.populateCenters);
  }

  handleSubmit(event) {
    event.preventDefault();
    let postEvent;
    const title = this.name.value;
    const date = this.date.value;
    const time = this.time.value;
    const description = this.description.value;
    const centerId = this.center.value;
    const token = JSON.parse(localStorage.token).value;
    const modalTitle = this.props.modalTitle;
    const history = this.props.history;
    const setEvent = this.props.setEventDetail;
    function saveEvent(res) {
      const eventData = {
        title,
        picture: res ? res.data.secure_url : undefined,
        publicId: res ? res.data.public_id : undefined,
        date,
        time,
        description,
        centerId,
        token,
      };
      if (modalTitle === 'New Event') {
        postEvent = axios.post(`${apiLink}/api/v1/events`, eventData);
      } else {
        postEvent = axios.put(`${apiLink}/api/v1/events/${eventId}`, eventData);
      }
      postEvent
        .then(response => {
          history.push(`/dashboard/events/${response.data.data.id}`);
          setEvent(response.data.data);
          if (modalTitle !== 'New Event') {
            $('#addNewEvent').modal('hide');
          }
        })
        .catch(err => {
          typeof err.response.data.message !== 'object' &&
            alert(JSON.stringify(err.response.data.message));
          (err.response.status === 403 || err.response.status === 401) &&
            logout('addNewEvent', history);
          if (typeof err.response.data.message === 'object') {
            let occupiedDates = '';
            err.response.data.message.OccupiedDates.forEach(date => {
              occupiedDates += `${new Date(date).toDateString()}\n`;
            });
            alert(
              `MESSAGE:\n${err.response.data.message.Sorry}\n\nOCCUPIED DATES:\n${occupiedDates}`
            );
            occupiedDates = '';
          }
        });
    }
    if (this.picture.files[0]) {
      const imageData = new FormData();
      const publicId = `${Date.now()}-${this.picture.files[0].name}`;
      imageData.append('file', this.picture.files[0]);
      imageData.append('tags', 'center, facilities, events');
      imageData.append('upload_preset', 'm4vlbdts');
      imageData.append('api_key', '789891965151338');
      imageData.append('timestamp', (Date.now() / 1000) | 0);
      imageData.append('folder', this.folder);
      imageData.append('public_id', publicId);
      axios
        .post('https://api.cloudinary.com/v1_1/eventmanager/image/upload', imageData)
        .then(res => saveEvent(res))
        .catch(err => {
          alert(err.response); // unsuccessful image upload
        });
    } else {
      saveEvent(undefined);
    }
  }
  componentWillReceiveProps(nextState) {
    const eventDefaults = nextState.eventDefaults;
    eventId = eventDefaults.id;
    this.name.value = eventDefaults.title;
    const date = new Date(eventDefaults.date); // The Date object lets you work with dates.
    const year = date.getFullYear(); // This method gets the four digit year.
    let month = date.getMonth() + 1; // This method gets the month and Jan is 0.
    let day = date.getDate(); // This method gets the day of month as a number.
    let hour = date.getHours(); // This method gets the hour
    let min = date.getMinutes(); // This method gets the minutes
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    hour = hour < 10 ? `0${hour}` : hour;
    // It adds a 0 to number less than 10 because input[type=time] only accepts 00:00 format.
    min = min < 10 ? `0${min}` : min;
    const eventDate = `${year}-${month}-${day}`;
    const eventTime = `${hour}:${min}`;
    this.date.value = eventDate;
    this.time.value = eventTime;
    this.description.value = eventDefaults.description;
    this.center.value = eventDefaults.center.id;
  }
  render() {
    const content = (
      <div
        className="modal fade"
        role="dialog"
        id="addNewEvent"
        tabIndex="-1"
        aria-labelledby="addNewEventLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content eventModal">
            <ModalHeader id="addNewEventTitle" title={this.props.modalTitle} />
            <div className="modal-body mx-sm-auto col-sm-10">
              <form role="form" onSubmit={this.handleSubmit}>
                <FormGroup
                  image={eventNameIcon}
                  alt="eventname"
                  inputProps={inputAttrs(
                    'text',
                    'eventTitle',
                    'Event Title',
                    'form-control input-sm',
                    input => (this.name = input),
                    'required'
                  )}
                />
                <FormGroup
                  image={eventImageIcon}
                  alt="eventImage"
                  inputProps={inputAttrs(
                    'file',
                    'eventImage',
                    'Event Image',
                    'form-control input-sm',
                    input => (this.picture = input)
                  )}
                />
                <FormGroup
                  image={eventDateIcon}
                  alt="eventdate"
                  inputProps={inputAttrs(
                    'date',
                    'eventdate',
                    'Event Date',
                    'form-control input-sm',
                    input => (this.date = input),
                    'required'
                  )}
                />
                <FormGroup
                  image={eventTimeIcon}
                  alt="eventTime"
                  inputProps={inputAttrs(
                    'time',
                    'eventTime',
                    'Event Time',
                    'form-control input-sm',
                    input => (this.time = input),
                    'required'
                  )}
                />
                <div className="form-group">
                  <label htmlFor="description" className="control-label">
                    Description
                  </label>
                  <textarea
                    required
                    name="description"
                    ref={input => (this.description = input)}
                    rows="2"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <select
                    required
                    ref={input => (this.center = input)}
                    className="custom-select-sm"
                  >
                    <Option value="" text="Select Center" disabled selected />
                    {this.props.centers.map(center => (
                      <Option
                        key={center.id}
                        value={center.id}
                        text={`${center.name}, ${center.address}, ${center.location}. Capacity: ${
                          center.capacity
                        }`}
                      />
                    ))}
                  </select>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-success createEvent">
                      Save
                    </button>
                    <button className="btn btn-danger" data-dismiss="modal">
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
    return content;
  }
}

export const AddEvent = connect(mapStateToProps, mapDispatchToProps)(AddEventComponent);
