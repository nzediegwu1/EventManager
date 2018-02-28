import React, { Component } from 'react';
import editIcon from '../resources/images/glyphicons-151-edit.png';
import removeIcon from '../resources/images/glyphicons-17-bin.png';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  let currentPage = state.page.currentPage;
  let owner = (currentPage === 'centerDetails') && (state.centers.centerDetails[0]) ?
    state.centers.centerDetails[0].user.id : (currentPage === 'manageEvent') && state.events.event[0] && state.events.event[0].user.id;
  return {
    owner: owner
  };
};
const Manager = (props) => {
  const content = (
    <td>
      <div className="manage">
        <button type="submit" id="editEvent" className="btn btn-success" data-toggle="modal" data-target={props.editModal}>
          <img src={editIcon} alt="Edit" />
        </button>
        <button type="submit" className="btn btn-danger icon-margin-left" id="deleteEvent">
          <img src={removeIcon} alt="delete" />
        </button>
      </div>
    </td>
  );
  return content;
}
class ManageDetails extends Component {
  render() {
    const content = (
      <table className="table-responsive col-sm-12 bg-transparent  zero-padding">
        <tbody>
          <tr>
            <td style={{ width: '80%' }}><h4 className="text-center"><b>{this.props.title}</b></h4></td>
            {
              (JSON.parse(localStorage.token).id === this.props.owner)
              && <Manager editModal={this.props.editModal} />
            }
          </tr>
        </tbody>
      </table>
    );
    return content;
  }
}
export const ManageDetailsHeader = connect(mapStateToProps)(ManageDetails);