import React, { Component } from 'react';
import editIcon from '../resources/images/glyphicons-151-edit.png';
import removeIcon from '../resources/images/glyphicons-17-bin.png';

export class ManageDetailsHeader extends Component {
  render() {
    const content = (
      <table className="table-responsive col-sm-12 bg-transparent  zero-padding">
        <tbody>
          <tr>
            <td style={{ width: '80%' }}><h4 className="text-center"><b>{this.props.title}</b></h4></td>
            <td>
              <div className="manage">
                <button type="submit" id="editEvent" className="btn btn-success" data-toggle="modal" data-target={this.props.editModal}>
                  <img src={editIcon} alt="Edit" />
                </button>
                <button type="submit" className="btn btn-danger icon-margin-left" id="deleteEvent">
                  <img src={removeIcon} alt="delete" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
    return content;
  }
}  