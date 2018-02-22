import React, { Component } from 'react';
import editIcon from '../resources/images/glyphicons-151-edit.png';
import removeIcon from '../resources/images/glyphicons-17-bin.png';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    accountType: state.accountType.accountType,
    creator: state.events.event[0].user.id
  };
};

class ManageDetails extends Component {
  render() {
    const content = (
      <table className="table-responsive col-sm-12 bg-transparent  zero-padding">
        <tbody>
          <tr>
            <td style={{ width: '80%' }}><h4 className="text-center"><b>{this.props.title}</b></h4></td>
            {
              (this.props.accountType === 'admin') && (JSON.parse(localStorage.token).id === this.props.creator) && (<td>
                <div className="manage">
                  <button type="submit" id="editEvent" className="btn btn-success" data-toggle="modal" data-target={this.props.editModal}>
                    <img src={editIcon} alt="Edit" />
                  </button>
                  <button type="submit" className="btn btn-danger icon-margin-left" id="deleteEvent">
                    <img src={removeIcon} alt="delete" />
                  </button>
                </div>
              </td>)
            }
          </tr>
        </tbody>
      </table>
    );
    return content;
  }
}
export const ManageDetailsHeader = connect(mapStateToProps)(ManageDetails);