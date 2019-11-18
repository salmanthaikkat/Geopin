import { CONTACT_HELP_MAIL_FAIL, CONTACT_HELP_MAIL_SUCCESS } from "../types";

const initialState = {
  message: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CONTACT_HELP_MAIL_SUCCESS:
      let successState = { ...state, message: action.payload };
      return successState;

    case CONTACT_HELP_MAIL_FAIL:
      let failState = { ...state, message: action.payload };
      return failState;

    default:
      return state;
  }
}
