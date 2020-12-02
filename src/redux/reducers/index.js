import { combineReducers } from 'redux';
import dialogFormReducer from './dialogReducer';
import tableDataReducer from './tableDataReducer';

const allReducers = combineReducers({
    dialogForm: dialogFormReducer,
    tableData: tableDataReducer,
});

export default allReducers;
