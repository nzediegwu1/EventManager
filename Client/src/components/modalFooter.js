import React from 'react';

export class ModalFooter extends React.Component {
    render() {
        const content = (
            <div className="modal-footer">
                <button className={this.props.class}>{this.props.success}</button>
                <button className="btn btn-danger" data-dismiss="modal">Cancel</button>
            </div>
        );
        return content;
    }
}