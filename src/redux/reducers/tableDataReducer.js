import * as actionTypes from '../actionTypes/tableDataActionTypes';

export default function tableDataReducer(state = [], action) {
    switch (action.type) {
        case actionTypes.TABLEDATA_ROW_ADD:
            return [...state, action.payload];

        case actionTypes.TABLEDATA_ROW_EDIT: {
            return state.map(el => {
                if(el.id === action.payload.id){
                    return action.payload;
                }
                return el;
            })
        }

        case actionTypes.TABLEDATA_ROW_REMOVE:
            return state.filter((el) => el.id !== action.payload.id);

        default:
            return [...state];
    }
}
