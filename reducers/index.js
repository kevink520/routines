import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import BTimesReducer from './BTimesReducer';
import STimesReducer from './STimesReducer';

export default combineReducers({
  auth: AuthReducer,
  bTimes: BTimesReducer,
  sTimes: STimesReducer,
});
