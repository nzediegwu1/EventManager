import React from 'react';
import { TableHead, TableRow } from './table';
import { Link } from 'react-router-dom';
import { populateUserList } from '../actions/userActions';
import { setDataCount } from '../actions/pageActions';
import { connect } from 'react-redux';
import { getAll, searchFunction } from '../services';
import Pagination from 'react-js-pagination';
import { LIMIT } from '../constants/actionTypes';
import { Filter } from './filterComponent';

const mapDispatchToProps = dispatch => ({
  populateUserList: users => dispatch(populateUserList(users)),
  setDataCount: count => dispatch(setDataCount(count)),
});
const mapStateToProps = state => ({
  userList: state.users.userList,
  dataCount: state.page.dataCount,
});

class UserListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.searchEvents = this.searchEvents.bind(this);
  }

  searchEvents(e) {
    searchFunction(e, 'userTable');
  }

  handlePageChange(pageNumber) {
    this.setState({
      activePage: pageNumber,
    });
    getAll(this.props, 'users', pageNumber);
  }

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
              {/* eslint-disable */}
              {this.props.userList.map(user => (
                <TableRow
                  key={user.id}
                  columns={[
                    <img className="center-image" src={`${user.picture}`} alt="center-view" />,
                    <Link className="event-detail" to={`profile/${user.id}`}>
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
            activePage={this.state.activePage}
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
