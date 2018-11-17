import firebase from 'firebase';
import { 
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOG_B_TIME,
  FETCH_B_TIMES_SUCCESS,
  FETCH_B_TIMES_FAIL,
  LOG_S_TIME,
  FETCH_S_TIMES_SUCCESS,
  FETCH_S_TIMES_FAIL,
} from './types';

export const emailChanged = email => ({
  type: EMAIL_CHANGED,
  email,
});

export const passwordChanged = password => ({
  type: PASSWORD_CHANGED,
  password,
});

export const loginUser = (email, password) => (
  dispatch => {
    dispatch({ type: LOGIN_USER });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => loginUserFail(dispatch));
  }
);

export const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    user,
  });
};

export const loginUserFail = dispatch => {
  dispatch({ type: LOGIN_USER_FAIL });
};

export const logBTime = () => {
  const { currentUser } = firebase.auth();
  const currentTimestamp = Date.now();
  const nextBTimestamp = currentTimestamp + (3 * 24 * 60 * 60 * 1000);
  return async dispatch => {
    const bTimesRef = firebase.database().ref(`/users/${currentUser.uid}/btimes`);
    await bTimesRef.push({
      timestamp: currentTimestamp,
    });
      
    await bTimesRef.push({
      timestamp: nextBTimestamp,
    });

    dispatch({ type: LOG_B_TIME });
    //dispatch(fetchBTimes());
  };
};

export const logSTime = () => {
  const { currentUser } = firebase.auth();
  const currentSTimestamp = Date.now();
  const nextWTimestamp = currentSTimestamp + (12 * 60 * 60 * 1000);
  const nextSTimestamp = nextWTimestamp + (24 * 60 * 60 * 1000);
  const nextNextWTimestamp = nextSTimestamp + (12 * 60 * 60 * 1000);
  return async dispatch => {
    const sTimesRef = firebase.database().ref(`/users/${currentUser.uid}/stimes`);
    await sTimesRef.push({
      sTimestamp: currentSTimestamp,
      wTimestamp: nextWTimestamp,
    });
      
    await sTimesRef.push({
      sTimestamp: nextSTimestamp,
      wTimestamp: nextNextWTimestamp,
    });

    dispatch({ type: LOG_S_TIME });
    //dispatch(fetchSTimes());
  };
};

export const fetchBTimes = () => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    firebase.database().ref(`/users/${currentUser.uid}/btimes`)
      .on('value', snapshot => {
        dispatch({
          type: FETCH_B_TIMES_SUCCESS,
          bTimes: snapshot.val() || {},
        });
      }, () => {
        dispatch({
          type: FETCH_B_TIMES_FAIL,
        });
      });
  }
};

export const fetchSTimes = () => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    firebase.database().ref(`/users/${currentUser.uid}/stimes`)
      .on('value', snapshot => {
        dispatch({
          type: FETCH_S_TIMES_SUCCESS,
          sTimes: snapshot.val() || {},
        });
      }, () => {
        dispatch({
          type: FETCH_S_TIMES_FAIL,
        });
      });
  }
};
