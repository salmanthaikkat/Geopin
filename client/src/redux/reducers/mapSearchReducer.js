import { SET_LAT_LNG, SET_ADDRESS } from "../types";

const initialState = {
  lat: "",
  lng: "",
  address: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LAT_LNG:
      let newState = {
        ...state,
        lat: action.payload.lat,
        lng: action.payload.lng
      };
      return newState;

    case SET_ADDRESS:
      let newAddressState = {
        ...state,
        address: action.payload
      };
      return newAddressState;

    default:
      return state;
  }
}
