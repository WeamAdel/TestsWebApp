import * as Utility from "./Utility";
import * as ActionTypes from "./ActionTypes";

const initState = {
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
    default:
      return state;
  }
}
