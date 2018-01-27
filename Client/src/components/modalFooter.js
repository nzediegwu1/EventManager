import React from 'react';

export class ModalFooter extends React.Component {
    render() {
        const content = (
            <div class="modal-footer">
                <button class={this.props.class}>{this.props.success}</button>
                <button class="btn btn-danger" data-dismiss="modal">Cancel</button>
            </div>
        );
        return content;
    }
}