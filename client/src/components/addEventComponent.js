import React from 'react';
import { FormGroup } from './formGroup';
import { ModalHeader } from './modalHeader';
import { Option } from './selectOption';
import { apiLink, Transactions, getAll, toastSettings } from '../services';
import { connect } from 'react-redux';
import { setEventDetail } from '../actions/eventActions';
import { getEventCenters } from '../actions/centerActions';
import { setDataCount, setActivePage, setEventDefaults } from '../actions/pageActions';
import { setSubmitState } from '../actions/submitAction';
import PropTypes from 'prop-types';
import { TableRow } from './table';
import Pagination from 'react-js-pagination';
import toastr from 'toastr';
import { ModalFooter } from './modalFooter';
import { initialState } from '../reducers/pageReducer';

toastr.options = toastSettings;
const inputAttrs = (inputType, inputName, placeholder, className, ref, id, required) => ({
  inputType,
  inputName,
  placeholder,
  className,
  ref,
  id,
  required,
});

let eventId;
const folder = apiLink === 'http://localhost:8080' ? 'dev/events' : 'prod/events';
export class AddEventComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedClass: 'custom-select-sm btn btn-info',
      displayDate: 'none',
      displayTime: 'none',
    };
  }
  checkValidation = () => {
    if (this.center.value === '') {
      toastr.error('No center selected');
    }
  };

  closeModal = () => {
    this.setState({
      selectedClass: 'custom-select-sm btn btn-info',
      displayDate: 'none',
      displayTime: 'none',
    });
    this.props.setEventDefaults(initialState);
    this.picture.value = '';
  };

  selectCenter = e => {
    this.setState({
      selectedClass: 'custom-select-sm btn btn-success',
    });
    this.center.value = e.target.id;
  };

  handlePageChange = pageNumber => {
    this.setState({
      selectedClass: 'custom-select-sm btn btn-info',
    });
    getAll(this.props, 'eventCenters', pageNumber, 1);
    this.props.setActivePage(pageNumber);
  };

  handleSubmit = event => {
    event.preventDefault();
    const props = this.props;
    const closeModal = this.closeModal;
    props.setSubmitState('processing');
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
      transactions.addOrUpdate(eventId, eventData, err => {
        props.setSubmitState('initial');
        if (!err) {
          closeModal();
        }
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
      imageData.append('folder', folder);
      imageData.append('public_id', publicId);
      transactions.uploadImage(imageData, saveEvent, () => {
        props.setSubmitState('initial');
      });
    } else {
      saveEvent(undefined);
    }
  };

  generateDate = eventDefaults => {
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
    return { eventDate, eventTime };
  };

  // Bind input controls with data when user wants to modify event
  // use get_derived_state_from_props
  componentWillReceiveProps(nextState) {
    const eventDefaults = nextState.eventDefaults;
    if (eventDefaults.title !== null) {
      eventId = eventId || eventDefaults.id;
      this.name.value = eventDefaults.title || '';
      const dateObject = this.generateDate(eventDefaults);
      this.date.value = dateObject.eventDate;
      this.time.value = dateObject.eventTime;
      this.description.value = eventDefaults.description || '';
      this.center = eventDefaults.centerId;
    }
  }

  handleChange = () => {
    const data = {
      title: this.name.value,
      date: new Date(`${this.date.value} ${this.time.value}`),
      picture: this.picture.value,
      description: this.description.value,
      centerId: this.center.value,
    };
    if (this.date.value !== '') {
      this.setState({
        displayDate: 'block',
      });
    }
    if (this.time.value !== '') {
      this.setState({
        displayTime: 'block',
      });
    }
    this.props.setEventDefaults(data);
  };

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
        data-keyboard="false"
        data-backdrop="static"
      >
        <div className="modal-dialog">
          <div className="modal-content eventModal">
            <ModalHeader id="addNewEventTitle" title={modalTitle} action={this.closeModal} />
            <div className="modal-body mx-sm-auto col-sm-10">
              <form role="form" id="eventForm" onSubmit={this.handleSubmit}>
                <FormGroup
                  image="glyphicons-619-mixed-buildings.png"
                  alt="eventname"
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                  inputProps={inputAttrs(
                    'date',
                    'eventdate',
                    'Event Date',
                    'form-control input-sm',
                    input => (this.date = input),
                    'event-date',
                    'required'
                  )}
                />
                <FormGroup
                  image="glyphicons-54-alarm.png"
                  alt="eventTime"
                  onChange={this.handleChange}
                  inputProps={inputAttrs(
                    'time',
                    'eventTime',
                    'Event Time',
                    'form-control input-sm',
                    input => (this.time = input),
                    'event-time',
                    'required'
                  )}
                />
                <div className="form-group">
                  <label id="description" htmlFor="description" className="control-label">
                    Description
                  </label>
                  <textarea
                    required
                    name="description"
                    ref={input => (this.description = input)}
                    rows="2"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    required
                    ref={input => (this.center = input)}
                    className="custom-select-sm"
                    style={{ display: 'none' }}
                    onChange={this.handleChange}
                  >
                    <Option value="" text="Select Center" disabled selected />
                    {centers.map(center => (
                      <Option
                        key={center.id}
                        value={center.id}
                        text={`${center.name}, ${center.address}, ${center.location}`}
                      />
                    ))}
                  </select>
                  {centers.map(center => (
                    <div key={center.id}>
                      <div>
                        <div className="event-center-img">
                          <img
                            id="cardImage"
                            className="event-center-Image"
                            src={`${center.picture}`}
                            alt="centerImage"
                          />
                        </div>
                        <div>
                          <div className="table-responsive">
                            <table
                              style={{ border: 'none' }}
                              className="table table-hover table-striped table-bordered"
                            >
                              <tbody>
                                <TableRow
                                  columns={[
                                    'name',
                                    center.availability === 'open' ? (
                                      <p>{center.name}</p>
                                    ) : (
                                      <p className="rejected">{center.name} (closed)</p>
                                    ),
                                  ]}
                                />
                                <TableRow
                                  columns={['Location', `${center.address} ${center.location}`]}
                                />
                                <TableRow columns={['Capacity', center.capacity]} />
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <button
                        id={center.id}
                        type="button"
                        onClick={this.selectCenter}
                        className={this.state.selectedClass}
                        style={{ borderRadius: '0em' }}
                      >
                        select
                      </button>
                      &nbsp;
                    </div>
                  ))}
                  <Pagination
                    activePage={this.props.activePage}
                    innerClass="pagination add-event"
                    itemsCountPerPage={1}
                    totalItemsCount={this.props.dataCount}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                  <ModalFooter
                    type="submit"
                    disabled={this.props.disabled}
                    checkValidation={this.checkValidation}
                    display={this.props.visibility}
                    closeModal={this.closeModal}
                  />
                  <p id="displayDate" style={{ display: this.state.displayDate }}>
                    {' '}
                  </p>
                  <p id="displayTime" style={{ display: this.state.displayTime }}>
                    {' '}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const actionCreators = {
  setEventDetail,
  getEventCenters,
  setDataCount,
  setSubmitState,
  setActivePage,
  setEventDefaults,
};
const mapStateToProps = state => ({
  modalTitle: state.page.modalTitle,
  eventDetails: state.events.event,
  eventDefaults: state.page.eventDefaults,
  centers: state.centers.eventCenters,
  dataCount: state.page.dataCount,
  disabled: state.process.disabled,
  visibility: state.process.visibility,
  activePage: state.page.activePage,
  random: state.page.random,
});

export const AddEvent = connect(mapStateToProps, actionCreators)(AddEventComponent);
AddEventComponent.propTypes = {
  modalTitle: PropTypes.string,
  centers: PropTypes.arrayOf(PropTypes.object),
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  visibility: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  dataCount: PropTypes.number,
  match: PropTypes.object,
  activePage: PropTypes.number,
  setActivePage: PropTypes.func,
};
