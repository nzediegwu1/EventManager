import React from 'react';
import Icon from './icon';
import PropTypes from 'prop-types';

export const Manager = props => (
  <td>
    <div className="manage">
      <button
        onClick={props.setModalProps}
        type="submit"
        id="editEvent"
        className="btn btn-success"
        data-toggle="modal"
        data-target={props.editModal}
      >
        <Icon src="glyphicons-151-edit.png" alt="Edit" />
      </button>
      <button
        onClick={props.deleteEvent}
        type="submit"
        className="btn btn-danger icon-margin-left"
        id="deleteEvent"
      >
        <Icon src="glyphicons-17-bin.png" alt="delete" />
      </button>
    </div>
  </td>
);

Manager.propTypes = {
  setModalProps: PropTypes.func,
  editModal: PropTypes.string,
  deleteEvent: PropTypes.func,
};

