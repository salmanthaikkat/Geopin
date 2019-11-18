import { GET_OTHER_USER_PROFILE } from "../types";

const initialState = {
  otherUser: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_OTHER_USER_PROFILE:
      let updatedState = { ...initialState, otherUser: action.payload };
      return updatedState;

    // case REMOVE_USER_PROFILE:
    //   let index = state.otherUser.saved.indexOf(action.payload.userId);
    //   return {
    //     ...state,
    //     otherUser: {
    //       ...state.otherUser,
    //       saved: {
    //         ...state.otherUser.saved,
    //         ...state.otherUser.saved.slice(index, 1)
    //       }
    //     }
    //   };
    default:
      return state;
  }
}
