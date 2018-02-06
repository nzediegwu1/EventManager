import React, { Component } from 'react';
import eventNameIcon from '../resources/images/glyphicons-619-mixed-buildings.png';
import eventImageIcon from '../resources/images/glyphicons-139-picture.png';
import eventDateIcon from '../resources/images/glyphicons-46-calendar.png';
import eventTimeIcon from '../resources/images/glyphicons-54-alarm.png';
import { FormGroup } from './formGroup';
import { ModalHeader } from './modalHeader';
import { ModalFooter } from './modalFooter';
import { Option } from './selectOption';

const inputAttrs = (inputType, inputName, placeholder, className, required) => {
  return { inputType, inputName, placeholder, className, required };
};

export class AddEvent extends Component {
  render() {
    const content = (
      <div className="modal fade" role="dialog" id="addNewEvent" tabIndex="-1" aria-labelledby="addNewEventLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content eventModal">
            <ModalHeader id='addNewEventTitle' title='New Event' />
            <div className="modal-body mx-sm-auto col-sm-10">
              <form role="form">
                <FormGroup image={eventNameIcon} alt='eventname' inputProps={inputAttrs('text', 'eventname', 'Event Name', 'form-control input-sm', 'required')} />
                <FormGroup image={eventImageIcon} alt='eventImage' inputProps={inputAttrs('file', 'eventImage', 'Event Image', 'form-control input-sm', 'required')} />
                <FormGroup image={eventDateIcon} alt='eventdate' inputProps={inputAttrs('date', 'eventdate', 'Event Date', 'form-control input-sm', 'required')} />
                <FormGroup image={eventTimeIcon} alt='eventTime' inputProps={inputAttrs('time', 'eventTime', 'Event Time', 'form-control input-sm', 'required')} />
                <div className="form-group">
                  <label htmlFor="description" className="control-label">Description</label>
                  <textarea name="description" rows="2" className="form-control"></textarea>
                </div>
                <div className="form-group">
                  <select className="custom-select-sm">
                  <Option text='Select Center'/>
                  <Option value='1' text='House on the Rock, Ikeja, Lagos. Capacity: 500'/>
                  <Option value='1' text='Christ embassy hall, Ikeja, Lagos. Capacity: 2300'/>
                  <Option value='1' text='House on the Rock FCT, Abuja. Capacity: 1200'/>
                  <Option value='1' text='National Assembly Conference Hall, Abuja. Capacity: 4500'/>
                  <Option value='1' text='National Stadium, Owerri, Imo. Capacity: 85,000'/>
                  </select>
                </div>
              </form>
              <ModalFooter class='btn btn-success createEvent' success='Save'/>
            </div>
          </div>
        </div>
      </div>
    );
    return content;
  }
}