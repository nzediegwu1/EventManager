import React from 'react';
import { ModalHeader } from './modalHeader';
import { FormGroup } from './formGroup';
import { Option } from './selectOption';
import { apiLink, Transactions } from '../services';
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
    this.folder = apiLink === 'http://localhost:8080' ? 'dev/centers' : 'prod/centers';
  }
  handleSubmit(event) {
    event.preventDefault();
    const transactions = new Transactions(this.props, 'center');
    const saveCenter = res => {
      const centerData = {
        name: this.name.value,
        address: this.address.value,
        location: this.location.value,
        capacity: this.capacity.value,
        price: this.price.value,
        availability: this.availability.value,
        token: JSON.parse(localStorage.token).value,
        picture: res.data.secure_url,
        publicId: res.data.public_id,
      };
      transactions.addOrUpdate(centerId, centerData);
    };
    const imageData = new FormData();
    const publicId = `${Date.now()}-${this.picture.files[0].name}`;
    imageData.append('file', this.picture.files[0]);
    imageData.append('tags', 'center, facilities, events');
    imageData.append('upload_preset', 'm4vlbdts');
    imageData.append('api_key', '789891965151338');
    imageData.append('timestamp', (Date.now() / 1000) | 0);
    imageData.append('folder', this.folder);
    imageData.append('public_id', publicId);
    transactions.uploadImage(imageData, saveCenter);
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
    const { modalTitle, required } = this.props;
    return (
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
            <ModalHeader id="addNewCenterTitle" title={modalTitle} />
            <div className="modal-body mx-sm-auto col-sm-10">
              <form role="form" onSubmit={this.handleSubmit}>
                <FormGroup
                  image="glyphicons-21-home.png"
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
                  image="glyphicons-139-picture.png"
                  alt="centerImage"
                  inputProps={inputAttrs(
                    'file',
                    'centerImage',
                    'Center Image',
                    'form-control input-sm',
                    input => (this.picture = input),
                    required
                  )}
                />
                <FormGroup
                  image="glyphicons-243-map-marker.png"
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
                  image="glyphicons-740-cadastral-map.png"
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
                  image="glyphicons-44-group.png"
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
                  image="glyphicons-228-usd.png"
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
  }
}
export const AddCenter = connect(mapStateToProps, mapDispatchToProps)(AddCenterComponent);
