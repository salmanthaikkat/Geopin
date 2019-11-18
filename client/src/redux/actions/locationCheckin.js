import {
  LOCATION_CHECKIN,
  LOCATION_CHECKIN_ERROR,
  FETCH_LOCATION_DETAILS
} from "../types";
import axios from "axios";

import API from "../../services/API_Service";

export const locationCheckin = locationData => {
  return async dispatch => {
    const token = JSON.parse(localStorage.getItem("user")).token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //console.log(token);
    try {
      const responseData = await API.call(
        "post",
        "location/addReview",
        locationData
      );
      if (responseData.success === true) {
        dispatch({
          type: LOCATION_CHECKIN,
          payload: responseData.message
        });
      } else {
        dispatch({
          type: LOCATION_CHECKIN_ERROR,
          payload: responseData.message
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getLocationDetails = locationReviews => {
  return async dispatch => {
    try {
      dispatch({
        type: FETCH_LOCATION_DETAILS,
        payload: locationReviews
      });
    } catch (err) {
      console.log(err);
    }
  };
};
