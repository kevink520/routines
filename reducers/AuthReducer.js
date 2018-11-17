import { 
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
} from '../actions/types';

const INITIAL_STATE = { 
  email: '',
  password: '',
  user: null,
  loading: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED :
      return {
        ...state,
        email: action.email,
      };

    case PASSWORD_CHANGED :
      return {
        ...state,
        password: action.password,
      };

    case LOGIN_USER :
      return {
        ...state,
        loading: true,
        error: '',
      };

    case LOGIN_USER_SUCCESS :
      return {
        ...state,
        user: action.user,
        loading: false,
      };

    case LOGIN_USER_FAIL :
      return {
        ...state,
        loading: false,
        error: 'Authentication failed.',
      };
    
    default :
      return state;
  }
};
