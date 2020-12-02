import * as actionTypes from '../actionTypes/tableDataActionTypes';

export default function tableDataReducer(state = [], action) {
    switch (action.type) {
        case actionTypes.TABLEDATA_ROW_ADD:
            return [...state, action.payload];

        case actionTypes.TABLEDATA_ROW_REMOVE:
            return state.filter((el) => el.id !== action.payload.id);

        default:
            return [...state];
    }
}
