import React, { Component } from 'react';
import { TableHead, TableRow } from './table';
import { Link } from 'react-router-dom';
import { populateUserList } from '../actions/userActions';
import { connect } from 'react-redux';
import { getAll } from '../services';

const mapDispatchToProps = dispatch => ({
  populateUserList: users => dispatch(populateUserList(users)),
});
const mapStateToProps = state => ({
  userList: state.users.userList,
});

class UserListComponent extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    getAll(this.props, 'users');
  }

  render() {
    return (
      <div className="mx-sm-auto col-sm-11">
        <b className="page-header">Users</b>
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
              columns={['Pic', 'Name', 'Phone', 'Account']}
              class="table-header table-header-main"
            />
            <tbody>
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
        </div>
      </div>
    );
  }
}

export const UserList = connect(mapStateToProps, mapDispatchToProps)(UserListComponent);
