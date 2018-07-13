import * as centerActions from '../../src/actions/centerActions';
import * as eventActions from '../../src/actions/eventActions';
import * as userActions from '../../src/actions/userActions';
import * as facilityActions from '../../src/actions/facilityAction';
import { setDataCount, setPage, setModalTitle } from '../../src/actions/pageActions';

const props = {
  populateCenters: centerActions.populateCenters,
  setDataCount,
  populateEvents: eventActions.populateEvents,
  getEventCenters: centerActions.getEventCenters,
  populateUserList: userActions.populateUserList,
  setCenterDetails: centerActions.setCenterDetails,
  setPage,
  setEventDetail: eventActions.setEventDetail,
  setProfileDetails: userActions.setProfileDetails,
  populateFacilities: facilityActions.populateFacilities,
  setModalTitle,
  history: {
    push: url => url,
  },
};
export default props;
