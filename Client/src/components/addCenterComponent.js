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
import { FacilityRow, FacilityHeader } from './facilityComponent';
import { Option } from './selectOption';

const inputAttrs = (inputType, inputName, placeholder, className, required) => {
  return { inputType, inputName, placeholder, className, required };
};
export class AddCenter extends Component {
  render() {
    const content = (
      <div className="modal fade" role="dialog" id="addNewCenter" tabIndex="-1" aria-labelledby="addNewCenterLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content eventModal">
            <ModalHeader id='addNewCenterTitle' title='New Center' />
            <div className="modal-body mx-sm-auto col-sm-10">
              <form role="form">
                <FormGroup image={centerNameIcon} alt='centername' inputProps={inputAttrs('text', 'centername', 'Center Name', 'form-control input-sm', 'required')} />
                <FormGroup image={centerImageIcon} alt='centerImage' inputProps={inputAttrs('file', 'centerImage', 'Center Image', 'form-control input-sm', 'required')} />
                <FormGroup image={addressIcon} alt='address' inputProps={inputAttrs('text', 'street', 'Address', 'form-control input-sm', 'required')} />
                <FormGroup image={cityIcon} alt='city' inputProps={inputAttrs('text', 'city', 'State/City', 'form-control input-sm', 'required')} />
                <FormGroup image={capacityIcon} alt='capacity' inputProps={inputAttrs('number', 'capacity', 'Capacity', 'form-control input-sm', 'required')} />
                <FormGroup image={amountIcon} alt='bookingAmount' inputProps={inputAttrs('number', 'bookingAmount', 'Booking price(per day)', 'form-control input-sm', 'required')} />
                <div className="form-group">
                  <select className="custom-select-sm">
                    <Option text='Availability'/>
                    <Option value='1' text='open'/>
                    <Option value='0' text='close'/>
                  </select>
                </div>
                <div className="form-group">
                  <div className="top-eight add-facility">
                    <div className="col-sm-10 zero-padding add-facility-90">
                      <b>Add facility</b>
                    </div>
                    <div className="col-sm-2 zero-padding" id="addFacility">
                      <a href="#"><img className="invert-color add-facility-icon" src={addIcon} /></a>
                    </div>
                  </div>
                  <div className="table-responsive centerSearch">
                    <table className="table table-hover grey-color">
                      <FacilityHeader deleteIcon={removeIcon} context='addCenter' />
                      <tbody>
                        <FacilityRow name='Projector' spec='200w...' quantity='150' context='addCenter' />
                        <FacilityRow name='Backup power' spec='15kw...' quantity='450' context='addCenter' />
                        <FacilityRow name='Sound system' spec='500w...' quantity='200' context='addCenter' />
                        <FacilityRow name='Smart lighting' spec='Energy..' quantity='349' context='addCenter' />
                        <FacilityRow name='Airconditioner' spec='2kw...' quantity='57' context='addCenter' />
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