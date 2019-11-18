import { SET_LAT_LNG, SET_ADDRESS } from "../types";

export const setLatLng = latLng => {
  return dispatch => {
    dispatch({
      type: SET_LAT_LNG,
      payload: latLng
    });
  };
};

export const setAddress = address => {
  return dispatch => {
    dispatch({
      type: SET_ADDRESS,
      payload: address
    });
  };
};
