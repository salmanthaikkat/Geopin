import {
  REGISTER_USER,
  REGISTER_ERROR,
  LOGIN_USER,
  LOGIN_ERROR,
  LOGOUT_USER,
  GOOGLE_AUTH
} from "../types";

import API from "../../services/API_Service";

export const registerUser = userData => {
  return async dispatch => {
    try {
      const responseData = await API.call("post", "auth/register", userData);
      if (responseData.success === true) {
        dispatch({
          type: REGISTER_USER,
          payload: responseData
        });
      } else {
        dispatch({
          type: REGISTER_ERROR,
          payload: responseData
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const loginUser = userData => {
  return async dispatch => {
    try {
      const responseData = await API.call("post", "auth/login", userData);
      if (responseData.success === true) {
        dispatch({
          type: LOGIN_USER,
          payload: responseData
        });
      } else {
        dispatch({
          type: LOGIN_ERROR,
          payload: responseData
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const googleAuth = userData => {
  return async dispatch => {
    try {
      const responseData = await API.call("post", "auth/googleAuth", userData);
      if (responseData.success === true) {
        dispatch({
          type: GOOGLE_AUTH,
          payload: responseData
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const logoutUser = () => {
  return async dispatch => {
    dispatch({
      type: LOGOUT_USER
    });
  };
};
