import React from 'react';
import { ModalHeader } from './modalHeader';
import { FormGroup } from './formGroup';
import Icon from './icon';
import { TableHead, TableRow } from './table';
import { populateFacilities, setUndeletedFacilities } from '../actions/facilityAction';
import { connect } from 'react-redux';
import { Transactions } from '../services';
import PropTypes from 'prop-types';
import { ModalFooter } from './modalFooter';

const inputAttrs = (inputType, inputName, placeholder, className, ref, required) => ({
  inputType,
  inputName,
  placeholder,
  className,
  ref,
  required,
});
const mapDispatchToProps = dispatch => ({
  populateFacilities: facilities => dispatch(populateFacilities(facilities)),
  setUndeletedFacilities: data => dispatch(setUndeletedFacilities(data)),
});

const mapStateToProps = state => ({
  facilities: state.facilities.facilities,
  undeleted: state.facilities.undeleted,
});
let toDelete = [];
let facilities;
let checker = 0;
let id = 0;
let changeSubmit;
class ManageFacilityComponent extends React.Component {
  constructor(props) {
    super(props);
    this.addFacility = this.addFacility.bind(this);
    this.setId = this.setId.bind(this);
    this.deleteMarked = this.deleteMarked.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeSubmitState = this.changeSubmitState.bind(this);
    this.state = {
      disabled: false,
      visibility: 'none',
    };
  }

  // Set and reset submitButton state: initial || processing
  changeSubmitState(state) {
    this.setState({
      disabled: state === 'initial' ? false : 'disabled',
      visibility: state === 'initial' ? 'none' : true,
    });
  }

  handleSubmit() {
    changeSubmit = this.changeSubmitState;
    changeSubmit('processing');
    const facilityData = this.props.undeleted;
    const data = {
      data: JSON.stringify({ content: facilityData }),
      content: facilityData,
    };
    const itemId = this.props.centerId;
    const transactions = new Transactions(this.props, 'facilities');
    transactions.addOrUpdate(itemId, data, () => {
      changeSubmit('initial');
    });
  }

  // delete facilities marked in table
  deleteMarked() {
    toDelete.forEach(index => {
      delete facilities[index];
    });
    const newFacilities = [];
    facilities.forEach(facility => {
      if (facility !== undefined) {
        newFacilities.push(facility);
      }
    });
    this.props.setUndeletedFacilities(newFacilities);
    toDelete = [];
  }

  // Collect id of facilities to be deleted upon check event
  setId(e) {
    const index = e.target.id;
    if (e.target.checked === true) {
      toDelete.push(index);
    } else {
      toDelete.splice(toDelete.indexOf(index), 1);
    }
  }

  // Handle dynamic adding of new facility to dynamic facility table
  addFacility(event) {
    id++;
    event.preventDefault();
    const name = this.name.value;
    const spec = this.spec.value;
    const quantity = this.quantity.value;
    const newFacility = [{ id, name, spec, quantity }];
    this.props.setUndeletedFacilities([...facilities, ...newFacility]);
  }
  render() {
    if (this.props.undeleted.length > 0) {
      checker++;
    }
    // facilities == undeleted or Facility data on centerDetails component load
    facilities = checker > 0 ? this.props.undeleted : this.props.data;
    return (
      <div
        className="modal fade"
        role="dialog"
        id="manageFacilities"
        tabIndex="-1"
        aria-labelledby="manageFacilitiesLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content eventModal">
            <ModalHeader id="facilities" title="Manage Facilities" />
            <div className="modal-body mx-sm-auto col-sm-10">
              <form role="form" onSubmit={this.addFacility}>
                <FormGroup
                  image="glyphicons-540-cart-tick.png"
                  alt="centername"
                  inputProps={inputAttrs(
                    'text',
                    'name',
                    'Facility Name',
                    'form-control input-sm',
                    input => (this.name = input),
                    'required'
                  )}
                />
                <FormGroup
                  image="glyphicons-249-asterisk.png"
                  alt="centerImage"
                  inputProps={inputAttrs(
                    'text',
                    'spec',
                    'Facility Spec',
                    'form-control input-sm',
                    input => (this.spec = input),
                    'required'
                  )}
                />
                <FormGroup
                  image="glyphicons-710-list-numbered.png"
                  alt="address"
                  inputProps={inputAttrs(
                    'number',
                    'quantity',
                    'Facility Count',
                    'form-control input-sm',
                    input => (this.quantity = input),
                    'required'
                  )}
                />
                <div className="form-group">
                  <div className="top-eight add-facility">
                    <div className="col-sm-10 zero-padding add-facility-90">
                      <b>Facilities</b>
                    </div>
                    <div className="col-sm-2 zero-padding" id="addFacility">
                      <a href="#">
                        <Icon
                          class="invert-color add-facility-icon"
                          src="glyphicons-191-plus-sign.png"
                          alt="add-facility"
                          clickAction={this.addFacility}
                        />
                      </a>
                    </div>
                  </div>
                  <div className="table-responsive centerSearch">
                    <table className="table table-hover grey-color table-striped">
                      {/* eslint-disable */}
                      <TableHead
                        columns={[
                          'Name',
                          'Spec',
                          'Quantity',
                          <Icon
                            src="glyphicons-17-bin.png"
                            alt="delete"
                            clickAction={this.deleteMarked}
                          />,
                        ]}
                        class="table-header"
                      />
                      <tbody>
                        {facilities.map(facility => {
                          const name = facility.name;
                          return (
                            <TableRow
                              key={facility.id}
                              columns={[
                                <b onClick={this.setId}>{facility.name}</b>,
                                <b>{facility.spec}</b>,
                                <span className="badge">{facility.quantity}</span>,
                                <div className="checkbox">
                                  <input
                                    type="checkbox"
                                    name="mark"
                                    id={facilities.findIndex(facility => facility.name === name)}
                                    onChange={this.setId}
                                  />
                                </div>,
                              ]}
                            />
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <ModalFooter
                  type="button"
                  disabled={this.state.disabled}
                  checkValidation={this.handleSubmit}
                  display={this.state.visibility}
                  closeModal={this.closeModal}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export const ManageFacilities = connect(mapStateToProps, mapDispatchToProps)(
  ManageFacilityComponent
);
ManageFacilityComponent.propTypes = {
  undeleted: PropTypes.arrayOf(PropTypes.object),
  centerId: PropTypes.string,
  setUndeletedFacilities: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.object),
};
