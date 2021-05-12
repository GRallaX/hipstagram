import { actionCreators } from "./actionCreators";
import {
  fetchCurrentUser,
  fetchRegistration,
  fetchLogIn,
  fetchUpdateUser,
  fetchUpdatePassword,
} from "../../api/currentUser";

export const getCurrentUser = () => {
  return async (dispatch) => {
    try {
      const { data: currentUser } = await fetchCurrentUser();
      dispatch(actionCreators.setCurrentUser(currentUser));
    } catch (e) {
      console.log(e);
    }
  };
};

export const userRegistration = (login, email, password) => {
  return async (dispatch) => {
    try {
      const {
        data: { id },
      } = await fetchRegistration(login, email, password);
      const {
        data: { access_token: token },
      } = await fetchLogIn(login, password);
      dispatch(actionCreators.setRegistration(id, token));
    } catch (e) {
      console.log(e);
    }
  };
};

export const logInUser = (login, password) => {
  return async (dispatch) => {
    try {
      const {
        data: { access_token: token },
      } = await fetchLogIn(login, password);
      dispatch(actionCreators.setLogIn(token));
    } catch (e) {
      console.log(e);
    }
  };
};

export const logOutUser = () => {
  return (dispatch) => {
    dispatch(actionCreators.setLogOut());
  };
};

export const updateCurrentUser = (
  firstName,
  lastName,
  email,
  login,
  avatar
) => {
  return async (dispatch) => {
    try {
      const { data: updatedUser } = await fetchUpdateUser(
        firstName,
        lastName,
        email,
        login,
        avatar
      );

      dispatch(actionCreators.setUpdateUser(updatedUser));
    } catch (e) {
      console.log(e);
    }
  };
};

export const updateUsersPassword = (
  login,
  password,
  newPassword,
  confirmNewPassword
) => {
  return async (dispatch) => {
    try {
      await fetchLogIn(login, password);
      await fetchUpdatePassword(newPassword, confirmNewPassword);
      dispatch(actionCreators.setPassword());
    } catch (e) {
      console.log(e);
    }
  };
};