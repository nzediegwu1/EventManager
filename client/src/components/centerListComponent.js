import React from 'react';
import { TableHead, TableRow } from './table';
import { Link } from 'react-router-dom';
import { populateCenters } from '../actions/centerActions';
import { setDataCount, setActivePage } from '../actions/pageActions';
import { connect } from 'react-redux';
import { getAll, searchFunction } from '../services';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import { LIMIT } from '../constants/actionTypes';
import { Filter } from './filterComponent';

const mapDispatchToProps = dispatch => ({
  populateCenters: centers => dispatch(populateCenters(centers)),
  setDataCount: count => dispatch(setDataCount(count)),
  setActivePage: pageNumber => dispatch(setActivePage(pageNumber)),
});
const mapStateToProps = state => ({
  centers: state.centers.centerList,
  dataCount: state.page.dataCount,
  activePage: state.page.activePage,
});

export class CenterList extends React.Component {
  searchEvents = e => {
    searchFunction(e, 'centerTable');
  };

  componentWillMount() {
    getAll(this.props, 'centers');
  }

  handlePageChange = pageNumber => {
    this.props.setActivePage(pageNumber);
    getAll(this.props, 'centers', pageNumber);
  };

  render() {
    return (
      <div className="mx-sm-auto col-sm-11">
        <b className="page-header">Centers</b>
        <Filter
          id="filter-centers"
          placeholder="Filter by name or location..."
          handleSearch={this.searchEvents}
        />
        <div className="table-responsive">
          <table id="centerTable" className="table table-hover table-main">
            <TableHead
              columns={['View', 'Name', 'Location', 'Capacity']}
              class="table-header table-header-main"
            />
            <tbody>
              {this.props.centers.map(center => (
                <TableRow
                  key={center.id}
                  columns={[
                    <img
                      key="nbhsidj0"
                      className="center-image"
                      src={`${center.picture}`}
                      alt="center-view"
                    />,
                    center.availability === 'open' ? (
                      <Link className="event-detail" to={`${this.props.match.path}/${center.id}`}>
                        {center.name}
                      </Link>
                    ) : (
                      <Link
                        className="event-detail rejected"
                        to={`${this.props.match.path}/${center.id}`}
                      >
                        {center.name} (closed)
                      </Link>
                    ),
                    `${center.name}, ${center.address}`,
                    <span key="centerCapacity1782yhbj" className="badge">
                      {center.capacity}
                    </span>,
                  ]}
                />
              ))}
            </tbody>
          </table>
          <br />
          <Pagination
            activePage={this.props.activePage}
            itemsCountPerPage={LIMIT}
            totalItemsCount={this.props.dataCount}
            pageRangeDisplayed={3}
            onChange={this.handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      </div>
    );
  }
}

export const MyCenters = connect(mapStateToProps, mapDispatchToProps)(CenterList);
CenterList.propTypes = {
  centers: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.object,
  activePage: PropTypes.number,
  dataCount: PropTypes.number,
  setActivePage: PropTypes.func,
};
