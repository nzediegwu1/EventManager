import React from 'react';
import { FormGroup } from './formGroup';
import { ModalHeader } from './modalHeader';
import { Option } from './selectOption';
import { getAll, apiLink, Transactions } from '../services';
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
let changeSubmit;
class AddEventComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeSubmitState = this.changeSubmitState.bind(this);
    this.folder = apiLink === 'http://localhost:8080' ? 'dev/events' : 'prod/events';
    this.state = {
      disabled: false,
      visibility: 'none',
    };
  }
  componentWillMount() {
    getAll(this.props, 'centers');
  }
  changeSubmitState(state) {
    this.setState({
      disabled: state === 'initial' ? false : 'disabled',
      visibility: state === 'initial' ? 'none' : true,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    changeSubmit = this.changeSubmitState;
    changeSubmit('processing');
    const transactions = new Transactions(this.props, 'event');
    const title = this.name.value;
    const date = this.date.value;
    const time = this.time.value;
    const description = this.description.value;
    const centerId = this.center.value;
    const token = JSON.parse(localStorage.token).value;
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
      transactions.addOrUpdate(eventId, eventData, () => {
        changeSubmit('initial');
      });
    }
    if (this.picture.files[0]) {
      const imageData = new FormData();
      const publicId = `${Date.now()}-${this.picture.files[0].name}`;
      imageData.append('file', this.picture.files[0]);
      imageData.append('tags', 'center, facilities, events');
      imageData.append('upload_preset', `${process.env.UPLOAD_PRESET}`);
      imageData.append('api_key', `${process.env.API_KEY}`);
      imageData.append('timestamp', (Date.now() / 1000) | 0);
      imageData.append('folder', this.folder);
      imageData.append('public_id', publicId);
      transactions.uploadImage(imageData, saveEvent);
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
    const { modalTitle, centers } = this.props;
    return (
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
            <ModalHeader id="addNewEventTitle" title={modalTitle} />
            <div className="modal-body mx-sm-auto col-sm-10">
              <form role="form" onSubmit={this.handleSubmit}>
                <FormGroup
                  image="glyphicons-619-mixed-buildings.png"
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
                  image="glyphicons-139-picture.png"
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
                  image="glyphicons-46-calendar.png"
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
                  image="glyphicons-54-alarm.png"
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
                    {centers.map(center => (
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
                    <button
                      type="submit"
                      className="btn btn-success createEvent"
                      disabled={this.state.disabled}
                    >
                      <i
                        className="fa fa-spinner fa-spin"
                        style={{ display: this.state.visibility }}
                      />
                      &nbsp; Save
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
  }
}

export const AddEvent = connect(mapStateToProps, mapDispatchToProps)(AddEventComponent);
