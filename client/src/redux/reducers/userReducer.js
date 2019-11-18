import {
  GET_USER_VISITED_REVIEWS,
  EDIT_USER_PROFILE_SUCCESS,
  SAVE_USER_PROFILE,
  REMOVE_USER_PROFILE,
  ERROR_SAVE_USER_PROFILE,
  EDIT_USER_PROFILE_FAILED
} from "../types";

const initialState = {
  userData: [],
  message: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_VISITED_REVIEWS:
      let updatedState = { ...initialState, userData: action.payload };
      return updatedState;

    case EDIT_USER_PROFILE_SUCCESS:
      let newUserProfile = { ...initialState, userData: action.payload };
      return newUserProfile;

    case SAVE_USER_PROFILE:
      return {
        ...state,
        userData: {
          ...state.userData,
          saved: {
            ...state.userData.saved,
            ...state.userData.saved.concat(action.payload.userId)
          }
        }
      };

    case EDIT_USER_PROFILE_FAILED:
      return { ...state, message: action.payload };

    case REMOVE_USER_PROFILE:
      let index = state.userData.saved.indexOf(action.payload.userId);
      return {
        ...state,
        userData: {
          ...state.userData,
          saved: {
            ...state.userData.saved,
            ...state.userData.saved.slice(index, 1)
          }
        }
      };

    default:
      return state;
  }
}
