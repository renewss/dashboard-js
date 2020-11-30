import { combineReducers } from 'redux';
import dialogFormReducer from './dialogReducer';

const allReducers = combineReducers({
    dialogForm: dialogFormReducer,
});

export default allReducers;
