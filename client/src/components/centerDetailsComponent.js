import React from 'react';
import { ManageDetailsHeader } from './manageDetailsHeader';
import { TableHead, TableRow } from './table';
import { setCenterDetails } from '../actions/centerActions';
import { setPage } from '../actions/pageActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOne } from '../services';
import Icon from './icon';
import { ManageFacilities } from './manageFacilityComponent';
import PropTypes from 'prop-types';


let centerOwner;
export class CenterDetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
  }
  componentWillMount() {
    getOne(this.props, this.id, 'centers');
  }
  componentWillUnmount() {
    this.props.setPage('dashboard');
  }
  render() {
    const center = this.props.centerDetails[0];
    if (center === undefined) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    }
    const loggedInUser = localStorage.token ? JSON.parse(localStorage.token).id : undefined;
    centerOwner = center.userId || centerOwner;
    const facilities = this.props.facilities.length > 0 ? this.props.facilities : center.facilities;
    return (
      <div className="card mx-sm-auto col-sm-11 zero-padding">
        {loggedInUser === centerOwner && (
          <ManageFacilities history={this.props.history} data={facilities} centerId={this.id} />
        )}
        <div className="card-header mg-event-header card-header-body">
          <ManageDetailsHeader
            history={this.props.history}
            param={this.id}
            title={center.name}
            editModal="#addNewCenter"
            currentPage={this.props.currentPage}
          />
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-5">
              <img
                id="cardImage"
                className="card-image"
                src={`${center.picture}`}
                alt="centerImage"
              />
            </div>
            <div className="col-sm-7">
              <div className="table-responsive">
                <table
                  style={{ border: 'none' }}
                  className="table table-hover table-striped table-bordered"
                >
                  <tbody>
                    <TableRow columns={['Street Address', center.address]} />
                    <TableRow columns={['City', center.location]} />
                    <TableRow columns={['Capacity', center.capacity]} />
                    <TableRow columns={['Booking price', center.price]} />
                    {center.availability === 'open' ? (
                      <TableRow columns={['Availability', center.availability]} />
                    ) : (
                      <TableRow columns={['Availability', 'closed']} class="rejected" />
                    )}
                    <TableRow columns={['Contact', center.user.email]} />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <br />
          <div className="top-eight add-facility">
            <div className="col-sm-10 zero-padding add-facility-90">
              <b className="appTitle">Facilities</b>
            </div>
            {loggedInUser === centerOwner && (
              <div className="col-sm-2 zero-padding" id="addFacility">
                <button
                  type="submit"
                  id="manageFacty"
                  className="btn btn-success manageFacility"
                  data-toggle="modal"
                  data-target="#manageFacilities"
                >
                  <Icon src="glyphicons-281-settings.png" alt="Edit" />
                </button>
              </div>
            )}
          </div>
          {/* eslint-disable */}
          <div className="table-responsive">
            <table className="table table-hover table-fixed table-striped">
              <TableHead columns={['Name', 'Spec', 'Quantity']} class="table-header" />
              <tbody>
                {facilities.map(facility => (
                  <TableRow
                    key={facility.id}
                    columns={[
                      <b>{facility.name}</b>,
                      <b>{facility.spec}</b>,
                      <span className="badge">{facility.quantity}</span>,
                    ]}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <br />
          <div className="table-responsive">
            <table className="table table-hover table-fixed table-striped">
              <TableHead columns={['Events', 'Title', 'Date']} class="table-header" />
              <tbody>
                {center.events.map(event => (
                  <TableRow
                    key={event.id}
                    columns={[
                      <img className="center-image" src={`${event.picture}`} alt="event-view" />,
                      event.status === 'rejected' ? (
                        <b>
                          <Link
                            className="event-detail rejected"
                            to={`/dashboard/events/${event.id}`}
                          >
                            {event.title} (rejected)
                          </Link>
                        </b>
                      ) : (
                        <b>
                          <Link className="event-detail" to={`/dashboard/events/${event.id}`}>
                            {event.title}
                          </Link>
                        </b>
                      ),
                      new Date(event.date).toDateString(),
                    ]}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export const mapStateToProps = state => ({
  centerDetails: state.centers.centerDetails,
  facilities: state.facilities.facilities,
  currentPage: state.page.currentPage,
});

export const mapDispatchToProps = dispatch => ({
  setCenterDetails: center => dispatch(setCenterDetails(center)),
  setPage: page => dispatch(setPage(page)),
});

CenterDetailsComponent.propTypes = {
  match: PropTypes.object,
  setPage: PropTypes.func,
  centerDetails: PropTypes.arrayOf(PropTypes.object),
  facilities: PropTypes.array,
  history: PropTypes.object,
  currentPage: PropTypes.number,
};
export const CenterDetails = connect(mapStateToProps, mapDispatchToProps)(CenterDetailsComponent);
