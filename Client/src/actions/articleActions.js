import { ADD_ARTICLE } from '../constants/actionTypes';

export const addArticle = (newArticle) => {
    return {
        type: ADD_ARTICLE,
        payload: newArticle,
    };
};
