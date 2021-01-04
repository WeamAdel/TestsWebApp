export const onAuthSuccess = function (state, payload) {
  console.log(payload);
  const data = { uid: payload.uid, apiToken: payload.apiToken };

  storeLoginData(data);
  return {
    ...state,
    app: data,
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
