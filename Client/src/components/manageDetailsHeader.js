import React, { Component } from 'react';
import editIcon from '../resources/images/glyphicons-151-edit.png';
import removeIcon from '../resources/images/glyphicons-17-bin.png';
import { connect } from 'react-redux';
import axios from 'axios';
import { setModalTitle, setRequired, setEventDefaults, setCenterDefaults } from '../actions/pageActions'

const mapStateToProps = state => {
  let currentPage = state.page.currentPage;
  let owner = (currentPage === 'centerDetails') && (state.centers.centerDetails[0]) ?
    state.centers.centerDetails[0].user.id : (currentPage === 'manageEvent') && state.events.event[0] && state.events.event[0].user.id;
  return {
    owner: owner,
    currentPage: state.page.currentPage,
    eventDetails: state.events.event,
    centerDetails: state.centers.centerDetails
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setModalTitle: title => dispatch(setModalTitle(title)),
    setRequired: value => dispatch(setRequired(value)),
    setEventDefaults: data => dispatch(setEventDefaults(data)),
    setCenterDefaults: data => dispatch(setCenterDefaults(data))
  };
};
const Manager = (props) => {
  const content = (
    <td>
      <div className="manage">
        <button onClick={props.setModalProps} type="submit" id="editEvent" className="btn btn-success" data-toggle="modal" data-target={props.editModal}>
          <img src={editIcon} alt="Edit" />
        </button>
        <button onClick={props.deleteEvent} type="submit" className="btn btn-danger icon-margin-left" id="deleteEvent">
          <img src={removeIcon} alt="delete" />
        </button>
      </div>
    </td>
  );
  return content;
}
let param, currentPage, history, resource;
class ManageDetails extends Component {
  constructor(props) {
    super(props)
    this.delete = this.delete;
  }
  delete() {
    const validate = confirm('Confirm delete action?');
    if (validate) {
      const urlGenerator = () => {
        const type = (currentPage === 'manageEvent') ? 'events' : 'centers';
        return `http://localhost:8080/api/v1/${type}/${param}/?token=${JSON.parse(localStorage.token).value}&file=${resource.picture}`;
      }
      const url = urlGenerator();
      axios.delete(url).then(res => {
        alert(res.data.data)
        history.push('/dashboard/events');
      }).catch(err => {
        alert(err.response.data.message);
        (err.response.status === 403 || err.response.status === 401) && logout('addNewEvent', history);
      });
    }
  }
  render() {
    param = this.props.param;
    currentPage = this.props.currentPage;
    history = this.props.history;
    resource = (currentPage === 'manageEvent') ? this.props.eventDetails[0] : this.props.centerDetails[0];

    const setModalProps = title => {
      this.props.setModalTitle(title);
      this.props.setRequired(false);
      (title === 'Modify Event') ? this.props.setEventDefaults(this.props.eventDetails[0])
        : this.props.setCenterDefaults(this.props.centerDetails[0]);
    }

    const content = (
      <table className="table-responsive col-sm-12 bg-transparent  zero-padding">
        <tbody>
          <tr>
            <td style={{ width: '80%' }}><h4 className="text-center"><b>{this.props.title}</b></h4></td>
            {
              (JSON.parse(localStorage.token).id === this.props.owner)
              && <Manager setModalProps={() => (currentPage === 'manageEvent') ? setModalProps('Modify Event')
                : setModalProps('Modify Center')} deleteEvent={this.delete} editModal={this.props.editModal} />
            }
          </tr>
        </tbody>
      </table>
    );
    return content;
  }
}
export const ManageDetailsHeader = connect(mapStateToProps, mapDispatchToProps)(ManageDetails);