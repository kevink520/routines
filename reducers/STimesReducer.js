import {
  LOG_S_TIME,
  FETCH_S_TIMES_SUCCESS,
  FETCH_S_TIMES_FAIL,
} from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_S_TIMES_SUCCESS:
      return action.sTimes;
    case LOG_S_TIME:
    case FETCH_S_TIMES_FAIL:
    default:
      return state;
  }
};
