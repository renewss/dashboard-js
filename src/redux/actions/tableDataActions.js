import * as actionTypes from '../actionTypes/tableDataActionTypes';

export const tableDataRowAdd = (payload) => {
    return {
        type: actionTypes.TABLEDATA_ROW_ADD,
        payload,
    };
};

export const tableDataRowRemove = (payload) => {
    return {
        type: actionTypes.TABLEDATA_ROW_REMOVE,
        payload,
    };
};
