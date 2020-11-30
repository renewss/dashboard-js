import * as actionTypes from '../actionTypes/dialogFormActionTypes';

export const dialogOpen = (payload) => {
    return {
        type: actionTypes.DIALOGFORM_OPEN,
        payload: {
            open: true,
        },
    };
};

export const dialogClose = (payload) => {
    return {
        type: actionTypes.DIALOGFORM_OPEN,
        payload: {
            open: false,
        },
    };
};
