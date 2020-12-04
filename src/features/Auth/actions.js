// (1) import constant
import { USER_LOGIN, USER_LOGOUT } from "./constants";
// (2) action userLogin
const userLogin = (user, token) => {
  return {
    type: USER_LOGIN,
    user,
    token,
  };
};
// (3) action userLogout
const userLogout = () => {
  return {
    type: USER_LOGOUT,
  };
};

export default { userLogin, userLogout };
