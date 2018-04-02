import React from 'react';
import { ModalHeader } from './modalHeader';
import { FormGroup } from './formGroup';
import facilityIcon from '../resources/images/glyphicons-540-cart-tick.png';
import specIcon from '../resources/images/glyphicons-249-asterisk.png';
import countIcon from '../resources/images/glyphicons-710-list-numbered.png';
import addIcon from '../resources/images/glyphicons-191-plus-sign.png';
import removeIcon from '../resources/images/glyphicons-17-bin.png';
import { TableHead, TableRow } from './table';
import { populateFacilities, setUndeletedFacilities } from '../actions/facilityAction';
import { connect } from 'react-redux';
import axios from 'axios';
import { apiLink } from '../reusables';

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
export class ManageFacilityComponent extends React.Component {
  constructor(props) {
    super(props);
    this.addFacility = this.addFacility.bind(this);
    this.setId = this.setId.bind(this);
    this.deleteMarked = this.deleteMarked.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    const undeleted = this.props.undeleted;
    const token = JSON.parse(localStorage.token).value;
    axios
      .post(`${apiLink}/api/v1/facilities/${this.props.centerId}?token=${token}`, {
        data: JSON.stringify({ content: undeleted }),
      })
      .then(res => {
        this.props.populateFacilities(undeleted);
        console.log(res.data.data);
      })
      .catch(error => {
        alert(error);
        console.log(error.response);
      });
  }
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
  setId(e) {
    const id = e.target.id;
    if (e.target.checked === true) {
      toDelete.push(id);
    } else {
      toDelete.splice(toDelete.indexOf(id), 1);
    }
  }
  addFacility(event) {
    event.preventDefault();
    const name = this.name.value;
    const spec = this.spec.value;
    const quantity = this.quantity.value;
    const newFacility = [{ name, spec, quantity }];
    this.props.setUndeletedFacilities([...facilities, ...newFacility]);
  }
  render() {
    if (this.props.undeleted.length > 0) {
      checker++;
    }
    facilities = checker > 0 ? this.props.undeleted : this.props.data;
    const content = (
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
                  image={facilityIcon}
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
                  image={specIcon}
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
                  image={countIcon}
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
                        <img
                          className="invert-color add-facility-icon"
                          src={addIcon}
                          onClick={this.addFacility}
                        />
                      </a>
                    </div>
                  </div>
                  <div className="table-responsive centerSearch">
                    <table className="table table-hover grey-color table-striped">
                      <TableHead
                        colNumber={4}
                        columns={[
                          'Name',
                          'Spec',
                          'Quantity',
                          <img src={removeIcon} alt="delete" onClick={this.deleteMarked} />,
                        ]}
                        class="table-header"
                      />
                      <tbody>
                        {facilities.map(facility => {
                          const name = facility.name;
                          return (
                            <TableRow
                              key={facility.id}
                              colNumber={4}
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
                <div className="modal-footer">
                  <button type="submit" hidden>
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-success createCenter"
                    onClick={this.handleSubmit}
                  >
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
export const ManageFacilities = connect(mapStateToProps, mapDispatchToProps)(
  ManageFacilityComponent
);
