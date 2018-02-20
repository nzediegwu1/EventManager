import { ADD_ARTICLE } from '../../constants/actionTypes';

const initialState = {
    articles: [],
}
const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ARTICLE:
            return { articles: [...state.articles, action.payload] };
            break;
        default:
            return state;
            break;
    }
}
export default articleReducer;