import React, { Component } from 'react';
import { ManageDetailsHeader } from './manageDetailsHeader';
import beijingImage from '../resources/images/beijing.jpg';
import { FacilityRow, FacilityHeader } from './facilityComponent';

const DetailRow = (props) => {
  return (
    <tr>
      <td><b>{props.name}</b></td>
      <td>{props.value}</td>
    </tr>
  )
}

export class CenterDetails extends Component {
  render() {
    const content = (
      <div className="card mx-sm-auto col-sm-11 zero-padding">
        <div className="card-header mg-event-header card-header-body">
          <ManageDetailsHeader title='Andela Epic Tower' editModal='#addNewCenter' />
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-4">
              <img id="cardImage" className="card-image" src={beijingImage} alt="centerImage" />
            </div>
            <div className="col-sm-8">
              <div className="table-responsive">
                <table style={{ border: 'none' }} className="table table-hover table-striped table-bordered">
                  <tbody>
                    <DetailRow name='Street Address' value='Anthony Layout, Mainland' />
                    <DetailRow name='City' value='Lagos, Nigeria' />
                    <DetailRow name='Capacity' value='5200' />
                    <DetailRow name='Booking price' value='N34000' />
                    <DetailRow name='Availability' value='Open' />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <br />
          <div className="table-responsive">
            <table className="table table-hover">
              <FacilityHeader />
              <tbody>
                <FacilityRow name='Projector' spec='200w...' quantity='150' />
                <FacilityRow name='Backup power' spec='15kw...' quantity='450' />
                <FacilityRow name='Sound system' spec='500w...' quantity='200' />
                <FacilityRow name='Smart lighting' spec='Energy..' quantity='349' />
                <FacilityRow name='Airconditioner' spec='2kw...' quantity='57' />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
    return content;
  }
}