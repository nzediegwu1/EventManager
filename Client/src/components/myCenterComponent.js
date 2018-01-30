import React, { Component } from 'react';
import romeImage from '../resources/images/rome.jpg';
import hongkong from '../resources/images/hongkong.jpg';
import temple from '../resources/images/temple.jpg';
import beijing from '../resources/images/beijing.jpg';

const MyCenterRow = (props) => {
  const content = (
    <tr className="center">
      <td><img className="center-image" src={props.image} alt="center-view" /></td>
      <td>{props.address}</td>
      <td>{props.city}</td>
      <td><span className="badge">{props.capacity}</span></td>
    </tr>
  );
  return content;
}
export class MyCenters extends Component {
  render() {
    const content = (
      <div className="mx-sm-auto col-sm-11">
        <b className="page-header">My Centers</b>
        <ul className="nav nav-pills flex-column">
          <li className="list-group-item sidebar-header text-center">
            <input className="form-control search-input" type="search" placeholder="Filter" aria-label="Search" />
          </li>
        </ul>
        <div className="table-responsive">
          <table className="table table-hover table-main">
            <thead className="table-header table-header-main">
              <tr>
                <th>View</th>
                <th>Name</th>
                <th>Location</th>
                <th>Capacity</th>
              </tr>
            </thead>
            <tbody>
              <MyCenterRow image={romeImage} address='Napoli metropolitan' city='Rome, Italy' capacity='9000' />
              <MyCenterRow image={hongkong} address='Quin mansion' city='Hongkong, China' capacity='12400' />
              <MyCenterRow image={temple} address='House on the Rock' city='Istambul, turkey' capacity='34700' />
              <MyCenterRow image={beijing} address='Beijing concert hall' city='Beijing, China' capacity='150000' />
            </tbody>
          </table>
        </div>
      </div>
    )
    return content;
  }
}