import React, { Component } from 'react';
import romeImage from '../resources/images/rome.jpg';
import hongkong from '../resources/images/hongkong.jpg';
import temple from '../resources/images/temple.jpg';
import beijing from '../resources/images/beijing.jpg';
import { TableHead } from './tableHead';
import { Link } from 'react-router-dom';

const MyCenterRow = (props) => {
  const content = (
    <tr className="center">
      <td><img className="center-image" src={props.image} alt="center-view" /></td>
      <td><Link className='event-detail' to={props.url}>{props.name}</Link></td>
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
        <b className="page-header">Centers</b>
        <ul className="nav nav-pills flex-column">
          <li className="list-group-item sidebar-header text-center">
            <input className="form-control search-input search-list" type="search" placeholder="Filter" aria-label="Search" />
          </li>
        </ul>
        <div className="table-responsive">
          <table className="table table-hover table-main">
          <TableHead col1='View' col2='Name' col3='Location' col4='Capacity' />
            <tbody>
              <MyCenterRow url={`${this.props.match.path}/id`} image={romeImage} name='Napoli metropolitan' city='Rome, Italy' capacity='9000' />
              <MyCenterRow url={`${this.props.match.path}/id`} image={hongkong} name='Quin mansion' city='Hongkong, China' capacity='12400' />
              <MyCenterRow url={`${this.props.match.path}/id`} image={temple} name='House on the Rock' city='Istambul, turkey' capacity='34700' />
              <MyCenterRow url={`${this.props.match.path}/id`} image={beijing} name='Beijing concert hall' city='Beijing, China' capacity='150000' />
            </tbody>
          </table>
        </div>
      </div>
    )
    return content;
  }
}