import React from 'react';
import { connect } from 'react-redux';
import { Manager } from './manager';
import {
  setModalTitle,
  setRequired,
  setEventDefaults,
  setCenterDefaults,
  setRandom,
  setDataCount,
} from '../actions/pageActions';
import { getEventCenters } from '../actions/centerActions';
import { apiLink, deleteResource, getOne } from '../services';
import PropTypes from 'prop-types';

class ManageDetails extends React.Component {
  componentWillReceiveProps(nextState) {
    this.param = nextState.param;
    this.currentPage = nextState.currentPage;
    this.history = nextState.history;
    this.resource =
      this.currentPage === 'manageEvent' ? nextState.eventDetails[0] : nextState.centerDetails[0];
  }

  setModalProps = title => {
    this.props.setModalTitle(title);
    this.props.setRequired(false);
    if (title === 'Modify Event') {
      const eventDetails = this.props.eventDetails[0];
      getOne(this.props, eventDetails.centerId, 'eventCenter');
      this.props.setEventDefaults(eventDetails);
      this.props.setRandom(Math.random());
    } else {
      this.props.setCenterDefaults(this.props.centerDetails[0]);
    }
  };

  /**
   * @description - Generate url for route handling deletion of resource
   *
   * @returns {string} - Url of resource to delete
   */
  urlGenerator = () => {
    const type = this.currentPage === 'manageEvent' ? 'events' : 'centers';
    const token = JSON.parse(localStorage.token).value;
    const publicId = this.resource.publicId;
    return `${apiLink}/api/v1/${type}/${this.param}/?token=${token}&file=${publicId}`;
  };

  /**
   * @description - Handle deletion of an event or center
   *
   * @memberof ManageDetails
   */
  delete = () => {
    const validate = confirm('Confirm delete action?');
    if (validate) {
      const url = this.urlGenerator();
      deleteResource(url, this.history);
    }
  };

  render() {
    return (
      <table className="table-responsive col-sm-12 bg-transparent  zero-padding">
        <tbody>
          <tr>
            <td style={{ width: '80%' }}>
              <h4 className="text-center">
                <b>{this.props.title}</b>
              </h4>
            </td>
            {JSON.parse(localStorage.token).id === this.props.owner && (
              <Manager
                setModalProps={() =>
                  this.currentPage === 'manageEvent'
                    ? this.setModalProps('Modify Event')
                    : this.setModalProps('Modify Center')
                }
                deleteEvent={this.delete}
                editModal={this.props.editModal}
              />
            )}
          </tr>
        </tbody>
      </table>
    );
  }
}
const generateOwner = state => {
  const currentPage = state.page.currentPage;
  let owner;
  if (currentPage === 'centerDetails' && state.centers.centerDetails[0]) {
    owner = state.centers.centerDetails[0].user.id;
  } else if (currentPage === 'manageEvent' && state.events.event[0]) {
    owner = state.events.event[0].user.id;
  }
  return owner;
};

const mapStateToProps = state => ({
  owner: generateOwner(state),
  currentPage: state.page.currentPage,
  eventDetails: state.events.event,
  centerDetails: state.centers.centerDetails,
});
const mapDispatchToProps = dispatch => ({
  setModalTitle: title => dispatch(setModalTitle(title)),
  setRequired: value => dispatch(setRequired(value)),
  setEventDefaults: data => dispatch(setEventDefaults(data)),
  setCenterDefaults: data => dispatch(setCenterDefaults(data)),
  setRandom: data => dispatch(setRandom(data)),
  getEventCenters: centers => dispatch(getEventCenters(centers)),
  setDataCount: count => dispatch(setDataCount(count)),
});

export const ManageDetailsHeader = connect(mapStateToProps, mapDispatchToProps)(ManageDetails);
ManageDetails.propTypes = {
  param: PropTypes.string,
  currentPage: PropTypes.string,
  history: PropTypes.object,
  eventDetails: PropTypes.arrayOf(PropTypes.object),
  centerDetails: PropTypes.arrayOf(PropTypes.object),
  setModalTitle: PropTypes.func,
  setRequired: PropTypes.func,
  editModal: PropTypes.string,
  title: PropTypes.string,
  owner: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  setEventDefaults: PropTypes.func,
  setCenterDefaults: PropTypes.func,
  setRandom: PropTypes.func,
};
