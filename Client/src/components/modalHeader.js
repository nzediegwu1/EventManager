import React from 'react';

export class ModalHeader extends React.Component {
  render() {
    const content = (
      <div className="modal-header">
        <h5 className="modal-title" id={this.props.id}><b>{this.props.title}</b></h5>
        <button className="close text-white" data-dismiss="modal">&times;</button>
      </div>
    );
    return content;
  }
}
