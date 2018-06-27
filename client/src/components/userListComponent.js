import React from 'react';
import { TableHead, TableRow } from './table';
import { Link } from 'react-router-dom';
import { populateUserList } from '../actions/userActions';
import { setDataCount, setActivePage } from '../actions/pageActions';
import { connect } from 'react-redux';
import { getAll, searchFunction } from '../services';
import Pagination from 'react-js-pagination';
import { LIMIT } from '../constants/actionTypes';
import { Filter } from './filterComponent';
import PropTypes from 'prop-types';

const mapDispatchToProps = dispatch => ({
  populateUserList: users => dispatch(populateUserList(users)),
  setDataCount: count => dispatch(setDataCount(count)),
  setActivePage: pageNumber => dispatch(setActivePage(pageNumber)),
});
const mapStateToProps = state => ({
  userList: state.users.userList,
  dataCount: state.page.dataCount,
  activePage: state.page.activePage,
});

class UserListComponent extends React.Component {
  searchEvents = e => {
    searchFunction(e, 'userTable');
  };

  handlePageChange = pageNumber => {
    this.props.setActivePage(pageNumber);
    getAll(this.props, 'users', pageNumber);
  };

  componentWillMount() {
    getAll(this.props, 'users');
  }

  render() {
    return (
      <div className="mx-sm-auto col-sm-11">
        <b className="page-header">Users</b>
        <Filter placeholder="Filter by name or phone..." handleSearch={this.searchEvents} />
        <div className="table-responsive">
          <table id="userTable" className="table table-hover table-main">
            <TableHead
              columns={['Pic', 'Name', 'Phone', 'Account']}
              class="table-header table-header-main"
            />
            <tbody>
              {this.props.userList.map(user => (
                <TableRow
                  key={user.id}
                  columns={[
                    <img key="usg2e" className="center-image" src={`${user.picture}`} alt="user" />,
                    <Link key="profilez832" className="event-detail" to={`profile/${user.id}`}>
                      {user.name}
                    </Link>,
                    user.phoneNo,
                    user.accountType,
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

export const UserList = connect(mapStateToProps, mapDispatchToProps)(UserListComponent);
UserListComponent.propTypes = {
  centers: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.object,
  activePage: PropTypes.number,
  dataCount: PropTypes.number,
  setActivePage: PropTypes.func,
  userList: PropTypes.arrayOf(PropTypes.object),
};
