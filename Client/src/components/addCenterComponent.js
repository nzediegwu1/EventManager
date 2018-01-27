import React, { Component } from 'react';
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
import { ModalFooter } from './modalFooter';

function FacilityRow(props) {
  const content = (
    <tr>
      <td>{props.name}</td>
      <td><span class="badge">{props.quantity}</span></td>
      <td><div class="checkbox"><input type="checkbox" name="mark" /></div></td>
    </tr>
  );
  return content;
}

const inputAttrs = (inputType, inputName, placeholder, className, required) => {
  return { inputType, inputName, placeholder, className, required };
};
export class AddCenter extends Component {
  render() {
    const content = (
      <div class="modal fade" role="dialog" id="addNewCenter" tabIndex="-1" aria-labelledby="addNewCenterLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content eventModal">
            <ModalHeader id='addNewCenterTitle' title='New Center' />
            <div class="modal-body mx-sm-auto col-sm-9">
              <form role="form">
                <FormGroup image={centerNameIcon} alt='centername' inputProps={inputAttrs('text', 'centername', 'Center Name', 'form-control input-sm', 'required')} />
                <FormGroup image={centerImageIcon} alt='centerImage' inputProps={inputAttrs('file', 'centerImage', 'Center Image', 'form-control input-sm', 'required')} />
                <FormGroup image={addressIcon} alt='address' inputProps={inputAttrs('text', 'street', 'Address', 'form-control input-sm', 'required')} />
                <FormGroup image={cityIcon} alt='city' inputProps={inputAttrs('text', 'city', 'State/City', 'form-control input-sm', 'required')} />
                <FormGroup image={capacityIcon} alt='capacity' inputProps={inputAttrs('number', 'capacity', 'Capacity', 'form-control input-sm', 'required')} />
                <FormGroup image={amountIcon} alt='bookingAmount' inputProps={inputAttrs('number', 'bookingAmount', 'Booking price(per day)', 'form-control input-sm', 'required')} />
                <div class="form-group">
                  <select class="custom-select-sm">
                    <option>
                      Availability
                      </option>
                    <option value="1">
                      open
                      </option>
                    <option value="0">
                      close
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <div class="top-eight add-facility">
                    <div class="col-sm-10 zero-padding add-facility-90">
                      <b>Add facility</b>
                    </div>
                    <div class="col-sm-2 zero-padding" id="addFacility">
                      <a href="#"><img class="invert-color add-facility-icon" src={addIcon} /></a>
                    </div>
                  </div>
                  <div class="table-responsive centerSearch">
                    <table class="table table-hover grey-color">
                      <thead class="table-header">
                        <tr>
                          <th>Name</th>
                          <th>Quantity</th>
                          <th><img src={removeIcon} alt="delete" /></th>
                        </tr>
                      </thead>
                      <tbody>
                        <FacilityRow name='Projector' quantity='150' />
                        <FacilityRow name='Backup power' quantity='450' />
                        <FacilityRow name='Sound system' quantity='200' />
                        <FacilityRow name='Smart lighting' quantity='349' />
                        <FacilityRow name='Airconditioner' quantity='57' />
                      </tbody>
                    </table>
                  </div>
                </div>
              </form>
              <ModalFooter class='btn btn-success createCenter' success='Save' />
            </div>
          </div>
        </div>
      </div>
    );
    return content;
  }
}