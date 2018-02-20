import { POPULATE_EVENTS } from '../../constants/actionTypes';

const initialState = {
    eventList: []
};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case POPULATE_EVENTS:
            return { eventList: action.payload }
            break;
        default:
        return state;
            break;
    }
}
export default eventReducer;