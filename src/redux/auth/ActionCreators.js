import * as ActionTypes from "./ActionTypes";
import axios from "axios";

const onAuthSuccess = ({ apiToken, uid }) => {
  return {
    type: ActionTypes.ON_AUTH_SUCCESS,
    payload: { apiToken, uid },
  };
};

const onAuthFail = ({ message, page }) => {
  return {
    type: ActionTypes.ON_AUTH_FAIL,
    payload: { message, page },
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

export const setAppData = (appData) => {
  return {
    type: ActionTypes.SET_APP_DATA,
    payload: appData,
  };
};

export const doLogout = () => {
  return {
    type: ActionTypes.DO_LOGOUT,
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
      console.log(error);
      dispatch(updateSignUpLoadingStatus(false));

      let message = "Something went wrong";
      if ((error.status = 400)) {
        if ((error.message = "EMAIL_EXISTS"))
          message =
            "This email already exists! sign in or enter a different email";
        else if (error.message == "TOO_MANY_ATTEMPTS_TRY_LATER")
          message = "Too many attempts, please try again later";
      }

      dispatch(onAuthFail({ message, page: "signUp" }));
    });
};

export const doAPISignIn = ({ email, password }) => (dispatch) => {
  const apiEndPoint =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
    projectWebAPIKey;

  dispatch(updateSignInLoadingStatus(true));
  axios
    .post(apiEndPoint, { email, password, returnSecureToken: true })
    .then((res) => {
      dispatch(updateSignInLoadingStatus(false));

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
      dispatch(updateSignInLoadingStatus(false));

      if ((error.status = 400)) {
        const message =
          error.message == "EMAIL_NOT_FOUND"
            ? "This email does not exist"
            : "Invalid password";
        dispatch(onAuthFail({ message, page: "signIn" }));
      }
    });
};
