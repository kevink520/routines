import {
  LOG_B_TIME,
  FETCH_B_TIMES_SUCCESS,
  FETCH_B_TIMES_FAIL,
} from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_B_TIMES_SUCCESS:
      return action.bTimes;
    case LOG_B_TIME:
    case FETCH_B_TIMES_FAIL:
    default:
      return state;
  }
};
