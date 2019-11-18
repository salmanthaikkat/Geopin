import {
  LOCATION_CHECKIN,
  LOCATION_CHECKIN_ERROR,
  FETCH_LOCATION_DETAILS
} from "../types";

const initialState = {
  error: "",
  success: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHECKIN:
      let newState = { ...initialState, error: "", success: true };
      return newState;

    case LOCATION_CHECKIN_ERROR:
      let newErrorState = {
        ...initialState,
        error: action.payload.message,
        success: false
      };
      return newErrorState;

    default:
      return state;
  }
}
