import { CONTACT_HELP_MAIL_SUCCESS, CONTACT_HELP_MAIL_FAIL } from "../types";
import API from "../../services/API_Service";

export const sendMail = mailData => {
  return async dispatch => {
    try {
      const mailResponse = await API.call("post", "contact/sendMail", mailData);
      console.log(mailResponse);
      // if (mailResponse.accepted.length > 0) {
      //   dispatch({
      //     type: CONTACT_HELP_MAIL_SUCCESS,
      //     payload: "Mail sent succesfully"
      //   });
      // } else {
      //   dispatch({
      //     type: CONTACT_HELP_MAIL_FAIL,
      //     payload: "Operation failed. Please try again later!"
      //   });
      // }
      dispatch({
        type: CONTACT_HELP_MAIL_FAIL,
        payload: "Operation failed. Please try again later!"
      });
    } catch (err) {
      console.log(err);
    }
  };
};
