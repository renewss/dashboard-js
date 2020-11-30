import * as actionTypes from '../actionTypes/dialogFormActionTypes';

export default function dialogReducer(state = {}, action) {
    switch (action.type) {
        case actionTypes.DIALOGFORM_OPEN:
            return { ...state, open: action.payload.open };

        case actionTypes.DIALOGFORM_CLOSE:
            return { ...state, open: action.payload.open };

        default:
            return state;
    }
}
