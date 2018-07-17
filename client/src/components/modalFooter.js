import React from 'react';
import PropTypes from 'prop-types';
export const ModalFooter = props => (
  <div className="modal-footer">
    {props.type === 'button' && (
      <button type="submit" hidden>
        Save
      </button>
    )}
    <button
      id={props.id}
      type={props.type}
      className="btn btn-success createEvent"
      disabled={props.disabled}
      onClick={props.checkValidation}
    >
      <i className="fa fa-spinner fa-spin" style={{ display: props.display }} />
      &nbsp; Save
    </button>
    <button className="btn btn-danger" onClick={props.closeModal} data-dismiss="modal">
      Cancel
    </button>
  </div>
);
ModalFooter.propTypes = {
  disabled: PropTypes.string,
  checkValidation: PropTypes.func,
  display: PropTypes.string,
  closeModal: PropTypes.func,
  type: PropTypes.string,
};
