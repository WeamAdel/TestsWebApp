import * as Utility from "./Utility";
import * as ActionTypes from "./ActionTypes";

const initState = {
  user: {
    username: null,
    email: null,
    isLogged: null,
  },
  app: {
    uid: null,
    apiToken: null,
  },
  signUp: {
    errors: null,
    isLoading: null,
  },
  signIn: {
    errors: null,
    isLoading: null,
  },
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case ActionTypes.ON_AUTH_SUCCESS:
      return Utility.onAuthSuccess(state, action.payload);
    case ActionTypes.UPDATE_SIGN_UP_LOADING_STATUS:
      return Utility.updateSignUpLoadingStatus(state, action.payload);
    case ActionTypes.UPDATE_SIGN_IN_LOADING_STATUS:
      return Utility.updateSignInLoadingStatus(state, action.payload);
    case ActionTypes.SET_APP_DATA:
      return Utility.setAppData(state, action.payload);
    case ActionTypes.DO_LOGOUT:
      return Utility.doLogout(state);
    default:
      return state;
  }
}
