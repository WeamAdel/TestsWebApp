import * as ActionTypes from "./ActionTypes";
import firebase from "../../configs/firebase";
import axios from "axios";

const onAuthSuccess = (userData) => {
  return {
    type: ActionTypes.ON_AUTH_SUCCESS,
    payload: userData,
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

export const doAPISignUp = ({ email, password, username }) => (dispatch) => {
  const apiEndPoint =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
    projectWebAPIKey;

  dispatch(updateSignUpLoadingStatus(true));
  axios
    .post(apiEndPoint, { email, password, returnSecureToken: true })
    .then((res) => {
      const data = res.data;
      dispatch(
        onAuthSuccess({
          apiToken: data.idToken,
          uid: data.localId,
          username,
          email,
          isAdmin: false,
        })
      );
      return data.localId;
    })
    .then((userId) => {
      dispatch(updateSignUpLoadingStatus(false));
      return doAPISaveUserData({ id: userId, username, email });
    })
    .catch(({ response }) => {
      dispatch(updateSignUpLoadingStatus(false));

      if (response && response.data) {
        const error = response.data.error;
        let message = "Too many attempts, please try again later";

        if (error.code == 400 && error.message == "EMAIL_EXISTS") {
          message =
            "This email already exists! sign in or enter a different email";
        }

        dispatch(onAuthFail({ message, page: "signUp" }));
      }
    });
};

async function doAPISaveUserData({ id, username, email }) {
  await firebase.database().ref(`users/${id}`).set({
    username,
    email,
  });
}

export const doAPISignIn = ({ email, password }) => (dispatch) => {
  const apiEndPoint =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
    projectWebAPIKey;

  dispatch(updateSignInLoadingStatus(true));
  axios
    .post(apiEndPoint, { email, password, returnSecureToken: true })
    .then((res) => {
      dispatch(updateSignInLoadingStatus(false));
      if (res.status === 200) return res.data;
    })
    .then(async (data) => {
      const { username, isAdmin } = await firebase
        .database()
        .ref("users/" + data.localId)
        .once("value")
        .then((snapshot) => snapshot.val());

      dispatch(
        onAuthSuccess({
          apiToken: data.idToken,
          uid: data.localId,
          username,
          isAdmin,
          email,
        })
      );
    })
    .catch(({ response }) => {
      dispatch(updateSignInLoadingStatus(false));

      if (response && response.data) {
        const error = response.data.error;
        if (error.code == 400) {
          let message = "Too many attempts, please try again later";
          if (error.message === "EMAIL_NOT_FOUND")
            message = "This email does not exist";
          else if (error.message === "INVALID_PASSWORD")
            message = "Invalid password";

          dispatch(onAuthFail({ message, page: "signIn" }));
        }
      }
    });
};
