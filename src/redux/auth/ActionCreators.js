import * as ActionTypes from "./ActionTypes";
import axios from "axios";

const onAuthSuccess = ({ apiToken, uid }) => {
  return {
    type: ActionTypes.ON_AUTH_SUCCESS,
    payload: { apiToken, uid },
  };
};

const updateSignUpLoadingStatus = (stauts) => {
  return {
    type: ActionTypes.UPDATE_SIGN_UP_LOADING_STATUS,
    payload: stauts,
  };
};

const updateSignInLoadingStatus = (status) => {
  return {
    type: ActionTypes.UPDATE_SIGN_IN_LOADING_STATUS,
    payload: status,
  };
};

/* API Actions */
const projectWebAPIKey = "AIzaSyDmoM405gtzCzG5nTHLJ5ffWg2tBNRp6Ug";

export const doAPISignUp = ({ email, password }) => (dispatch) => {
  const apiEndPoint =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
    projectWebAPIKey;

  dispatch(updateSignUpLoadingStatus(true));
  axios
    .post(apiEndPoint, { email, password, returnSecureToken: true })
    .then((res) => {
      dispatch(updateSignUpLoadingStatus(false));
      if (res.status == 200) {
        const data = res.data;
        dispatch(
          onAuthSuccess({
            apiToken: data.idToken,
            uid: data.localId,
          })
        );
      }
    })
    .catch((error) => {
      dispatch(updateSignUpLoadingStatus(false));
      console.log(error);
    });
};