import React, { Component } from 'react';
import eventNameIcon from '../resources/images/glyphicons-619-mixed-buildings.png';
import eventImageIcon from '../resources/images/glyphicons-139-picture.png';
import eventDateIcon from '../resources/images/glyphicons-46-calendar.png';
import eventTimeIcon from '../resources/images/glyphicons-54-alarm.png';
import { FormGroup } from './formGroup';

const inputAttrs = (inputType, inputName, placeholder, className, required) => {
  return { inputType, inputName, placeholder, className, required };
};

export class AddEvent extends Component {
  render() {
    const content = (
      <div className="modal fade" role="dialog" id="addNewEvent" tabindex="-1" aria-labelledby="addNewEventLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content eventModal">
            <div className="modal-header modalCustom">
              <h5 className="modal-title" id="addNewEventTitle"><b>New Event</b></h5>
              <button className="close text-white" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body mx-sm-auto col-sm-9">
              <form role="form">
                <FormGroup image={eventNameIcon} alt='eventname' inputProps={inputAttrs('text', 'eventname', 'Event Name', 'form-control input-sm', 'required')} />
                <FormGroup image={eventImageIcon} alt='eventImage' inputProps={inputAttrs('file', 'eventImage', 'Event Image', 'form-control input-sm', 'required')} />
                <FormGroup image={eventDateIcon} alt='eventdate' inputProps={inputAttrs('date', 'eventdate', 'Event Date', 'form-control input-sm', 'required')} />
                <FormGroup image={eventTimeIcon} alt='eventTime' inputProps={inputAttrs('time', 'eventTime', 'Event Time', 'form-control input-sm', 'required')} />
                <div className="form-group">
                  <label for="description" className="control-label">Description</label>
                  <textarea name="description" rows="2" className="form-control"></textarea>
                </div>
                <div className="form-group">
                  <select className="custom-select-sm">
                    <option>
                      Select Center
                    </option>
                    <option value="1">
                      House on the Rock, Ikeja, Lagos. Capacity: 500
                      </option>
                    <option value="1">
                      Christ embassy hall, Ikeja, Lagos. Capacity: 2300
                      </option>
                    <option value="1">
                      House on the Rock FCT, Abuja. Capacity: 1200
                      </option>
                    <option value="1">
                      National Assembly Conference Hall, Abuja. Capacity: 4500
                      </option>
                    <option value="1">
                      National Stadium, Owerri, Imo. Capacity: 85,000
                    </option>
                  </select>
                </div>
              </form>
              <div className="modal-footer">
                <button className="btn btn-success createEvent">Save</button>
                <button className="btn btn-danger" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return content;
  }
}