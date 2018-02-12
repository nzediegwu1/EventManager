import { ADD_ARTICLE } from '../../constants/actionTypes';

const initialState = {
    articles: [],
}
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ARTICLE:
            return { ...state, articles: [...state.articles, action.payload] };
            break;
        default:
            return state;
            break;
    }
}
export default rootReducer;