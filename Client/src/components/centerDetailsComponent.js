import React, { Component } from 'react';
import { ManageDetailsHeader } from './manageDetailsHeader';
import { TableHead, TableRow } from './table';
import axios from 'axios';
import { setCenterDetails } from '../actions/centerActions';
import { setPage } from '../actions/pageActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapDispatchToProps = dispatch => {
  return {
    setCenterDetails: center => dispatch(setCenterDetails(center)),
    setPage: page => dispatch(setPage(page))
  };
};

const mapStateToProps = state => {
  return {
    centerDetails: state.centers.centerDetails,
  };
};

class CenterDetailsComponent extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    axios.get(`http://localhost:8080/api/v1/centers/${this.props.match.params.id}`)
      .then(res => {
        this.props.setCenterDetails(res.data.data);
        this.props.setPage('centerDetails');
      }).catch(err => {
        alert(err.response.data.message);
        (err.response.status === 404 || err.response.status === 400) && this.props.history.push('/dashboard/centers');
      });
  }
  componentWillUnmount() {
    this.props.setPage('dashboard');
  }
  render() {
    const center = this.props.centerDetails[0];
    if (center === undefined) {
      return <div><h2>Loading...</h2></div>
    }
    const content = (
      <div className="card mx-sm-auto col-sm-11 zero-padding">
        <div className="card-header mg-event-header card-header-body">
          <ManageDetailsHeader history={this.props.history} param={this.props.match.params.id} title={center.name} editModal='#addNewCenter'/>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-5">
              <img id="cardImage" className="card-image" src={`http://localhost:8080/public/centers/${center.picture}`} alt="centerImage" />
            </div>
            <div className="col-sm-7">
              <div className="table-responsive">
                <table style={{ border: 'none' }} className="table table-hover table-striped table-bordered">
                  <tbody>
                    <TableRow colNumber={2} columns={['Street Address', center.address]} />
                    <TableRow colNumber={2} columns={['City', center.location]} />
                    <TableRow colNumber={2} columns={['Capacity', center.capacity]} />
                    <TableRow colNumber={2} columns={['Booking price', center.price]} />
                    <TableRow colNumber={2} columns={['Availability', center.availability]} />
                    <TableRow colNumber={2} columns={['Contact', center.user.email]} />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <br />
          <div className="table-responsive">
            <table className="table table-hover table-fixed">
              <TableHead colNumber={3} columns={['Facilities', 'Spec', 'Quantity']} class='table-header' />
              <tbody>
                <TableRow colNumber={3} columns={[<b>Projector</b>, <b>200w...</b>, <span className="badge">150</span>]} />
                <TableRow colNumber={3} columns={[<b>Backup power</b>, <b>150kw...</b>, <span className="badge">450</span>]} />
                <TableRow colNumber={3} columns={[<b>Sound system</b>, <b>500w...</b>, <span className="badge">200</span>]} />
                <TableRow colNumber={3} columns={[<b>Smart lighting</b>, <b>Energy...</b>, <span className="badge">349</span>]} />
                <TableRow colNumber={3} columns={[<b>Airconditioner</b>, <b>2kw...</b>, <span className="badge">57</span>]} />
              </tbody>
            </table>
          </div>
          <br />
          <div className="table-responsive last">
            <table className="table table-hover table-fixed">
              <TableHead colNumber={3} columns={['Events', 'Title', 'Date']} class='table-header' />
              <tbody>
                {center.events.map(event => (
                  <TableRow key={event.id} colNumber={3} columns={[
                    <img className="center-image" src={`http://localhost:8080/public/events/${event.picture}`} alt="event-view" />,
                    <b><Link className='event-detail' to={`/dashboard/events/${event.id}`}>{event.title}</Link></b>,
                    new Date(event.date).toDateString()
                  ]} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div >
    );
    return content;
  }
}
export const CenterDetails = connect(mapStateToProps, mapDispatchToProps)(CenterDetailsComponent);