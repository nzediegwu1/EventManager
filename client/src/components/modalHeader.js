import React from 'react';
import PropTypes from 'prop-types';

export class ModalHeader extends React.Component {
  render() {
    return (
      <div className="modal-header">
        <h5 className="modal-title" id={this.props.id}>
          <b>{this.props.title}</b>
        </h5>
        <button className="close text-white" data-dismiss="modal">
          &times;
        </button>
      </div>
    );
  }
}
ModalHeader.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
};
