import {
  LOGIN_USER,
  REGISTER_USER,
  LOGIN_ERROR,
  LOGOUT_USER,
  GOOGLE_AUTH
} from "../types";

const user = localStorage.getItem("user");

const initialState = user
  ? {
      user,
      error: "",
      isLoggedIn: true
    }
  : {
      user: {},
      error: "",
      isLoggedIn: false
    };

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return state;

    case LOGIN_USER:
      localStorage.setItem("user", JSON.stringify(action.payload));
      let loginSuccessState = {
        ...state,
        user: {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email
        },
        isLoggedIn: true
      };
      return loginSuccessState;

    case GOOGLE_AUTH:
      localStorage.setItem("user", JSON.stringify(action.payload));
      let googleloginState = {
        ...state,
        user: {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email
        },
        isLoggedIn: true
      };
      return googleloginState;

    case LOGIN_ERROR:
      localStorage.clear();
      const loginFailureState = {
        ...state,
        user: {},
        error: action.payload.message,
        isLoggedIn: false
      };

      return loginFailureState;

    case LOGOUT_USER:
      localStorage.clear();
      const logoutState = {
        ...state,
        user: {},
        error: "",
        isLoggedIn: false
      };
      return logoutState;

    default:
      return state;
  }
}
