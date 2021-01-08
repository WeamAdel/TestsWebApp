export const onAuthSuccess = function (
  state,
  { username, email, uid, apiToken, isAdmin }
) {
  const data = { uid, apiToken };

  storeLoginData(data);
  return {
    ...state,
    app: data,
    user: {
      username,
      email,
      isAdmin: isAdmin ? true : false,
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

export const setAppData = function (state, data) {
  if (data && data.uid) {
    const { uid, email, username, isAdmin, apiToken } = data;
    return {
      ...state,
      app: uid
        ? {
            uid,
            apiToken,
          }
        : state.app,
      user: {
        ...state.user,
        username: username ?? null,
        email: email ?? null,
        isLogged: uid ? true : false,
        isAdmin: isAdmin ? true : false,
      },
    };
  } else {
    return {
      ...state,
      user: {
        ...state.user,
        isLogged: false,
      },
    };
  }
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
      isAdmin: null,
      isLogged: false,
    },
  };
};
