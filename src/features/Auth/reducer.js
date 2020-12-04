import { USER_LOGIN, USER_LOGOUT } from "./constants";

let initialState = { user: null, token: null };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // (1) logika menangani action USER_LOGIN
    case USER_LOGIN:
      return { user: action.user, token: action.token };
    case USER_LOGOUT:
      return { user: null, token: null };

    default:
      return state;
  }
};

export default reducer;
