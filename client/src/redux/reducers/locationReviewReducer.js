import {
  GET_LOCATION_REVIEWS,
  GET_OTHER_USER_INFO,
  GET_OTHER_USER_INFO_FAILED
} from "../types";

const initialState = {
  reviews: [],
  otherData: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATION_REVIEWS:
      let newState = { ...initialState, reviews: action.payload };
      return newState;

    case GET_OTHER_USER_INFO:
      let otherUserState = { ...initialState, otherData: action.payload };
      return otherUserState;

    case GET_OTHER_USER_INFO_FAILED:
      let failedUserState = { ...initialState, otherData: action.payload };
      return failedUserState;

    default:
      return state;
  }
}
