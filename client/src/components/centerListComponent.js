import React, { Component } from 'react';
import { TableHead, TableRow } from './table';
import { Link } from 'react-router-dom';
import { populateCenters } from '../actions/centerActions';
import { connect } from 'react-redux';
import { getAll } from '../services';

const mapDispatchToProps = dispatch => ({
  populateCenters: centers => dispatch(populateCenters(centers)),
});
const mapStateToProps = state => ({
  centers: state.centers.centerList,
});

class CenterList extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    getAll(this.props, 'centers');
  }

  render() {
    return (
      <div className="mx-sm-auto col-sm-11">
        <b className="page-header">Centers</b>
        <ul className="nav nav-pills flex-column">
          <li className="list-group-item sidebar-header text-center">
            <input
              className="form-control search-input search-list"
              type="search"
              placeholder="Filter"
              aria-label="Search"
            />
          </li>
        </ul>
        <div className="table-responsive">
          <table className="table table-hover table-main">
            <TableHead
              columns={['View', 'Name', 'Location', 'Capacity']}
              class="table-header table-header-main"
            />
            <tbody>
              {this.props.centers.map(center => (
                <TableRow
                  key={center.id}
                  columns={[
                    <img className="center-image" src={`${center.picture}`} alt="center-view" />,
                    <Link className="event-detail" to={`${this.props.match.path}/${center.id}`}>
                      {center.name}
                    </Link>,
                    `${center.name}, ${center.address}`,
                    <span className="badge">{center.capacity}</span>,
                  ]}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export const MyCenters = connect(mapStateToProps, mapDispatchToProps)(CenterList);
