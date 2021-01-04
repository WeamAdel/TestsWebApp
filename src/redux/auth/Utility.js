export const onAuthSuccess = function (state, payload) {
  console.log(payload);
  const data = { uid: payload.uid, apiToken: payload.apiToken };

  storeLoginData(data);
  return {
    ...state,
    app: data,
    user: {
      ...state.user,
      isLogged: true,
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

export const setAppData = function (state, { uid, apiToken }) {
  return {
    ...state,
    app: {
      uid,
      apiToken,
    },
    user: {
      ...state.user,
      isLogged: uid ? true : false,
    },
  };
};
