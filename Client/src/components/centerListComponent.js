import React, { Component } from 'react';
import { TableHead, TableRow } from './table';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { populateCenters } from '../actions/centerActions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
  return {
    populateCenters: centers => dispatch(populateCenters(centers)),
  };
};
const mapStateToProps = state => {
  return {
    centers: state.centers.centerList,
  };
};

class CenterList extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    axios.get('http://localhost:8080/api/v1/centers')
      .then(res => {
        this.props.populateCenters(res.data.data);
      }).catch(err => {
        alert(err);
      });
  }

  render() {
    const content = (
      <div className="mx-sm-auto col-sm-11">
        <b className="page-header">Centers</b>
        <ul className="nav nav-pills flex-column">
          <li className="list-group-item sidebar-header text-center">
            <input className="form-control search-input search-list" type="search" placeholder="Filter" aria-label="Search" />
          </li>
        </ul>
        <div className="table-responsive">
          <table className="table table-hover table-main">
            <TableHead colNumber={4} columns={['View', 'Name', 'Location', 'Capacity']} class='table-header table-header-main' />
            <tbody>
              {this.props.centers.map(center => (
                <TableRow key={center.id} colNumber={4} columns={[
                  <img className="center-image" src={`http://localhost:8080/public/centers/${center.picture}`} alt="center-view" />,
                  <Link className='event-detail' to={`${this.props.match.path}/${center.id}`}>{center.name}</Link>,
                  `${center.name}, ${center.address}`,
                  <span className="badge">{center.capacity}</span>
                ]} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
    return content;
  }
}

export const MyCenters = connect(mapStateToProps, mapDispatchToProps)(CenterList);