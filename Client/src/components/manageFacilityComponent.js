import React from 'react';
import { ModalHeader } from './modalHeader';
import { FormGroup } from './formGroup';
import centerNameIcon from '../resources/images/glyphicons-21-home.png';
import centerImageIcon from '../resources/images/glyphicons-139-picture.png';
import addressIcon from '../resources/images/glyphicons-243-map-marker.png';
import addIcon from '../resources/images/glyphicons-191-plus-sign.png';
import removeIcon from '../resources/images/glyphicons-17-bin.png';
import { TableHead, TableRow } from './table';

const inputAttrs = (inputType, inputName, placeholder, className, ref, required) => ({
  inputType,
  inputName,
  placeholder,
  className,
  ref,
  required,
});

export class ManageFacilities extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
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
              <form role="form" onSubmit={this.handleSubmit}>
                <FormGroup
                  image={centerNameIcon}
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
                  image={centerImageIcon}
                  alt="centerImage"
                  inputProps={inputAttrs(
                    'text',
                    'spec',
                    'Facility Spec',
                    'form-control input-sm',
                    input => (this.picture = input),
                    'required'
                  )}
                />
                <FormGroup
                  image={addressIcon}
                  alt="address"
                  inputProps={inputAttrs(
                    'number',
                    'quantity',
                    'Facility Count',
                    'form-control input-sm',
                    input => (this.address = input),
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
                        <img className="invert-color add-facility-icon" src={addIcon} />
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
