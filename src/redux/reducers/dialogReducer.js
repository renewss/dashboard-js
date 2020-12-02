import * as actionTypes from '../actionTypes/dialogFormActionTypes';

export default function dialogReducer(state = {}, action) {
    switch (action.type) {
        case actionTypes.DIALOGFORM_OPEN:
            return  action.payload ;

        case actionTypes.DIALOGFORM_CLOSE:
            return { open: action.payload.open };

        default:
            return state;
    }
}
