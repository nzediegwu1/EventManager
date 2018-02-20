import { POPULATE_EVENTS } from '../constants/actionTypes';

export const populateEvents = (eventList) => {
    return {
        type: POPULATE_EVENTS,
        payload: eventList,
    };
};