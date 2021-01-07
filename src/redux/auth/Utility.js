import { connect } from "react-redux";

export const onAuthSuccess = function (state, payload) {
  const data = { uid: payload.uid, apiToken: payload.apiToken };

  storeLoginData(data);
  return {
    ...state,
    app: data,
    user: {
      ...state.user,
      isLogged: true,
    },
    signIn: {
      ...state.signIn,
      errors: false,
    },
    signUp: {
      ...state.signUp,
      errors: false,
    },
  };
};

export const onAuthFail = function (state, { message, page }) {
  return {
    ...state,
    [page]: {
      ...state[page],
      errors: message,
    },
  };
};

function storeLoginData({ apiToken, uid }) {
  localStorage.setItem(
    "app",
    JSON.stringify({
      uid,
      apiToken,
    })
  );
}

export const updateSignUpLoadingStatus = function (state, status) {
  return {
    ...state,
    signUp: {
      ...state.signUp,
      isLoading: status,
    },
  };
};

export const updateSignInLoadingStatus = function (state, status) {
  return {
    ...state,
    signIn: {
      ...state.signIn,
      isLoading: status,
    },
  };
};

export const setAppData = function (state, appData) {
  return {
    ...state,
    app: {
      uid: appData ? appData.uid : null,
      apiToken: appData ? appData.apiToken : null,
    },
    user: {
      ...state.user,
      isLogged: appData?.uid ? true : false,
    },
  };
};

export const doLogout = function (state) {
  localStorage.removeItem("app");
  return {
    ...state,
    app: {
      uid: null,
      apiToken: null,
    },
    user: {
      username: null,
      email: null,
      isLogged: false,
    },
  };
};
