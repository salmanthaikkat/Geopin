import { combineReducers } from "redux";
import authReducer from "./authReducer";
import contactReducer from "./contactReducer";
import mapSearchReducer from "./mapSearchReducer";
import locationReducer from "./locationReducer";
import locationReviewReducer from "./locationReviewReducer";
import userReducer from "./userReducer";
import otherUserReducer from "./otherUserReducer";

export default combineReducers({
  auth: authReducer,
  contact: contactReducer,
  mapSearch: mapSearchReducer,
  location: locationReducer,
  locationReview: locationReviewReducer,
  userDetails: userReducer,
  otherUserDetails: otherUserReducer
});
