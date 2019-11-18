import {
  GET_LOCATION_REVIEWS,
  GET_USER_VISITED_REVIEWS,
  GET_OTHER_USER_INFO,
  SAVE_USER_PROFILE,
  ERROR_SAVE_USER_PROFILE,
  GET_OTHER_USER_PROFILE,
  EDIT_USER_PROFILE_SUCCESS,
  REMOVE_USER_PROFILE,
  EDIT_USER_PROFILE_FAILED,
  GET_OTHER_USER_INFO_FAILED
} from "../types";

import API from "../../services/API_Service";
import axios from "axios";

export const getLocationReview = locationReview => {
  return async dispatch => {
    try {
      dispatch({
        type: GET_LOCATION_REVIEWS,
        payload: locationReview
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getUserVisitedReviews = () => {
  return async dispatch => {
    const token = JSON.parse(localStorage.getItem("user")).token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const responseData = await API.call("post", "location/getUserReview");
      dispatch({
        type: GET_USER_VISITED_REVIEWS,
        payload: responseData
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getOtherUserProfile = id => {
  return async dispatch => {
    const token = JSON.parse(localStorage.getItem("user")).token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      let inputData = {
        id: id
      };
      const responseData = await API.call(
        "post",
        "location/getOtherUserReview",
        inputData
      );
      if (responseData != null) {
        dispatch({
          type: GET_OTHER_USER_INFO,
          payload: responseData
        });
      } else {
        dispatch({
          type: GET_OTHER_USER_INFO_FAILED,
          payload: null
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const editUserProfile = userData => {
  return async dispatch => {
    const token = JSON.parse(localStorage.getItem("user")).token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const responseData = await API.call(
        "post",
        "userProfile/editProfile",
        userData
      );
      if (responseData.success === true) {
        dispatch({
          type: EDIT_USER_PROFILE_SUCCESS,
          payload: responseData.user
        });
      } else {
        dispatch({
          type: EDIT_USER_PROFILE_FAILED,
          payload: responseData.user
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const saveUserProfile = userId => {
  return async dispatch => {
    const token = JSON.parse(localStorage.getItem("user")).token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    let input = {
      user_id: userId
    };

    try {
      const responseData = await API.call(
        "post",
        "userProfile/save-contact",
        input
      );
      if (responseData.success === true) {
        dispatch({
          type: SAVE_USER_PROFILE,
          payload: responseData
        });
      } else {
        dispatch({
          type: ERROR_SAVE_USER_PROFILE,
          payload: responseData
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeUserProfile = userId => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  let userInput = {
    user_id: userId
  };

  return async dispatch => {
    try {
      const responseData = await API.call(
        "post",
        "userProfile/remove-contact",
        userInput
      );
      dispatch({
        type: REMOVE_USER_PROFILE,
        payload: responseData
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getOtherUserInfo = () => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async dispatch => {
    try {
      const responseData = await API.call("post", "userProfile/get-profile");
      dispatch({
        type: GET_OTHER_USER_PROFILE,
        payload: responseData
      });
    } catch (err) {
      console.log(err);
    }
  };
};
