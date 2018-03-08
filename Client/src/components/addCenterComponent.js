import React from 'react';
import { ModalHeader } from './modalHeader';
import { FormGroup } from './formGroup';
import centerNameIcon from '../resources/images/glyphicons-21-home.png';
import centerImageIcon from '../resources/images/glyphicons-139-picture.png';
import addressIcon from '../resources/images/glyphicons-243-map-marker.png';
import cityIcon from '../resources/images/glyphicons-740-cadastral-map.png';
import capacityIcon from '../resources/images/glyphicons-44-group.png';
import amountIcon from '../resources/images/glyphicons-548-bitcoin.png';
import addIcon from '../resources/images/glyphicons-191-plus-sign.png';
import removeIcon from '../resources/images/glyphicons-198-remove-circle.png';
import { Option } from './selectOption';
import { TableHead, TableRow } from './table';
import axios from 'axios';
import { logout } from '../reusables';
import { connect } from 'react-redux';
import { setCenterDetails } from '../actions/centerActions';

const inputAttrs = (inputType, inputName, placeholder, className, ref, required) => ({
  inputType,
  inputName,
  placeholder,
  className,
  ref,
  required,
});

const mapDispatchToProps = dispatch => ({
  setCenterDetails: center => dispatch(setCenterDetails(center)),
  // setCenterDefaults: data => dispatch(setCenterDefaults(data)),
});
const mapStateToProps = state => ({
  modalTitle: state.page.modalTitle,
  required: state.page.required,
  centerDefaults: state.page.centerDefaults,
});
let centerId;
class AddCenterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    const newCenter = new FormData();
    newCenter.append('name', this.name.value);
    newCenter.append('picture', this.picture.files[0]);
    newCenter.append('address', this.address.value);
    newCenter.append('location', this.location.value);
    newCenter.append('capacity', this.capacity.value);
    newCenter.append('price', this.price.value);
    newCenter.append('availability', this.availability.value);
    newCenter.append('token', JSON.parse(localStorage.token).value);

    let httpRequest;
    if (this.props.modalTitle === 'New Center') {
      httpRequest = axios.post('http://localhost:8080/api/v1/centers', newCenter);
    } else {
      httpRequest = axios.put(`http://localhost:8080/api/v1/centers/${centerId}`, newCenter);
    }
    httpRequest
      .then(res => {
        alert('Successful');
        this.props.history.push(`/dashboard/centers/${res.data.data.id}`);
        this.props.setCenterDetails(res.data.data);
        if (this.props.modalTitle !== 'New Center') {
          $('#addNewCenter').modal('hide');
        }
      })
      .catch(err => {
        typeof err.response.data.message !== 'object' &&
          alert(JSON.stringify(err.response.data.message));
        (err.response.status === 403 || err.response.status === 401) &&
          logout('addNewCenter', this.props.history);
      });
    event.preventDefault();
  }
  componentWillReceiveProps(nextState) {
    const centerDefaults = nextState.centerDefaults;
    this.name.value = centerDefaults.name;
    this.address.value = centerDefaults.address;
    this.location.value = centerDefaults.location;
    this.capacity.value = centerDefaults.capacity;
    this.price.value = centerDefaults.price;
    this.availability.value = centerDefaults.availability;
    centerId = centerDefaults.id;
  }
  render() {
    const content = (
      <div
        className="modal fade"
        role="dialog"
        id="addNewCenter"
        tabIndex="-1"
        aria-labelledby="addNewCenterLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content eventModal">
            <ModalHeader id="addNewCenterTitle" title={this.props.modalTitle} />
            <div className="modal-body mx-sm-auto col-sm-10">
              <form role="form" onSubmit={this.handleSubmit}>
                <FormGroup
                  image={centerNameIcon}
                  alt="centername"
                  inputProps={inputAttrs(
                    'text',
                    'centername',
                    'Center Name',
                    'form-control input-sm',
                    input => (this.name = input),
                    'required'
                  )}
                />
                <FormGroup
                  image={centerImageIcon}
                  alt="centerImage"
                  inputProps={inputAttrs(
                    'file',
                    'centerImage',
                    'Center Image',
                    'form-control input-sm',
                    input => (this.picture = input),
                    this.props.required
                  )}
                />
                <FormGroup
                  image={addressIcon}
                  alt="address"
                  inputProps={inputAttrs(
                    'text',
                    'street',
                    'Address',
                    'form-control input-sm',
                    input => (this.address = input),
                    'required'
                  )}
                />
                <FormGroup
                  image={cityIcon}
                  alt="city"
                  inputProps={inputAttrs(
                    'text',
                    'city',
                    'State/City',
                    'form-control input-sm',
                    input => (this.location = input),
                    'required'
                  )}
                />
                <FormGroup
                  image={capacityIcon}
                  alt="capacity"
                  inputProps={inputAttrs(
                    'number',
                    'capacity',
                    'Capacity',
                    'form-control input-sm',
                    input => (this.capacity = input),
                    'required'
                  )}
                />
                <FormGroup
                  image={amountIcon}
                  alt="bookingAmount"
                  inputProps={inputAttrs(
                    'number',
                    'bookingAmount',
                    'Booking price(per day)',
                    'form-control input-sm',
                    input => (this.price = input),
                    'required'
                  )}
                />
                <div className="form-group">
                  <select
                    required
                    ref={input => (this.availability = input)}
                    className="custom-select-sm"
                  >
                    <Option value="" text="Availability" disabled selected />
                    <Option value="open" text="open" />
                    <Option value="close" text="close" />
                  </select>
                </div>
                <div className="form-group">
                  <div className="top-eight add-facility">
                    <div className="col-sm-10 zero-padding add-facility-90">
                      <b>Add facility</b>
                    </div>
                    <div className="col-sm-2 zero-padding" id="addFacility">
                      <a href="#">
                        <img className="invert-color add-facility-icon" src={addIcon} />
                      </a>
                    </div>
                  </div>
                  <div className="table-responsive centerSearch">
                    <table className="table table-hover grey-color">
                      <TableHead
                        colNumber={4}
                        columns={[
                          'Facilities',
                          'Spec',
                          'Quantity',
                          <img src={removeIcon} alt="delete" />,
                        ]}
                        class="table-header"
                      />
                      <tbody>
                        <TableRow
                          colNumber={4}
                          columns={[
                            <b>Projector</b>,
                            <b>200w...</b>,
                            <span className="badge">150</span>,
                            <div className="checkbox">
                              <input type="checkbox" name="mark" />
                            </div>,
                          ]}
                        />
                        <TableRow
                          colNumber={4}
                          columns={[
                            <b>Backup power</b>,
                            <b>150kw...</b>,
                            <span className="badge">450</span>,
                            <div className="checkbox">
                              <input type="checkbox" name="mark" />
                            </div>,
                          ]}
                        />
                        <TableRow
                          colNumber={4}
                          columns={[
                            <b>Sound system</b>,
                            <b>500w...</b>,
                            <span className="badge">200</span>,
                            <div className="checkbox">
                              <input type="checkbox" name="mark" />
                            </div>,
                          ]}
                        />
                        <TableRow
                          colNumber={4}
                          columns={[
                            <b>Smart lighting</b>,
                            <b>Energy...</b>,
                            <span className="badge">349</span>,
                            <div className="checkbox">
                              <input type="checkbox" name="mark" />
                            </div>,
                          ]}
                        />
                        <TableRow
                          colNumber={4}
                          columns={[
                            <b>Airconditioner</b>,
                            <b>2kw...</b>,
                            <span className="badge">57</span>,
                            <div className="checkbox">
                              <input type="checkbox" name="mark" />
                            </div>,
                          ]}
                        />
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success createCenter">
                    Save
                  </button>
                  <button className="btn btn-danger" data-dismiss="modal">
                    Cancel
                  </button>
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
export const AddCenter = connect(mapStateToProps, mapDispatchToProps)(AddCenterComponent);
