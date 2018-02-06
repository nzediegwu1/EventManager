import React, { Component } from 'react';
import beijingImage from '../resources/images/beijing.jpg';
import calenderIcon from '../resources/images/glyphicons-46-calendar.png';
import timeIcon from '../resources/images/glyphicons-54-alarm.png';
import { ManageDetailsHeader } from './manageDetailsHeader';

export class ManageEvent extends Component {
  render() {
    const content = (
      <div className="card mx-sm-auto col-sm-11 zero-padding">
        <div className="card-header mg-event-header card-header-body">
          <ManageDetailsHeader title='World Developers Conference' editModal='#addNewEvent' />
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-4">
              <img className="card-image" src={beijingImage} alt="eventImage" />
            </div>
            <div className="col-sm-8">
              <blockquote className="blockquote mb-0">
                <b>Description</b>: className is little more than syntactic sugar over the prototype-based behavior delegation capabilities we've had all along. This article will take a close look at the basic use of ES2015's className keyword, from the perspective of its relation to prototypes. We'll cover:
                  Defining and instantiating classNamees;
                  Creating subclassNamees with extends;
                  super calls from subclassNamees; and
                  Examples of important symbol methods.
                  Along the way, we'll pay special attention to how className maps to prototype-based code under the hood.
              </blockquote><br />
              <h5 className="text-center"> <b>Address: Andela Epic Tower, Lagos, Nigeria</b></h5>
            </div>
          </div>
        </div>
        <div className="card-footer text-muted mg-event-header">
          <div className="row text-white">
            <div className="col-sm-6">
              <img className="invert-color" src={calenderIcon} /> Date: 20th December, 2017
            </div>
            <div className="col-sm-6">
              <img className="invert-color" src={timeIcon} /> Start Time: 8:30 AM
            </div>
          </div>
        </div>
      </div>
    );
    return content;
  }
}