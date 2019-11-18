import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getOtherUserInfo,
  removeUserProfile,
  getUserVisitedReviews
} from "../../redux/actions/locationReviewAction";
import { IconButton } from "@material-ui/core";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProgress from "@material-ui/core/CircularProgress";
import history from "../../history";
import user from "../../assets/defaultUser.png";
import "./saved-contacts.scss";

const SavedContacts = props => {
  let savedLength;

  if (props.userData.saved) {
    savedLength = props.userData.saved.length;
  } else {
    savedLength = null;
  }

  useEffect(() => {
    props.getOtherUserInfo();
    props.getUserVisitedReviews();
  }, [savedLength]);

  return (
    <div className="saved-contacts-container">
      <div className="saved-contacts-title">
        <h3>Saved Contacts</h3>
      </div>
      <div className="saved-contacts-contents">
        {props.otherUserData.saved ? (
          props.otherUserData.saved.length !== 0 ? (
            props.otherUserData.saved.map(userData => {
              return (
                <div className="saved-contact-main">
                  <IconButton
                    className="remove-contact-icon-button"
                    onClick={() => {
                      props.removeUserProfile(userData._id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTimesCircle} />
                  </IconButton>
                  <img
                    src={
                      userData.profileImage ? `${userData.profileImage}` : user
                    }
                    alt={userData.name}
                    onClick={() => {
                      history.push(`/visitor-profile/${userData._id}`);
                    }}
                  />
                </div>
              );
            })
          ) : (
            <div className="no-contact-data">
              <span>No Contacts available</span>
            </div>
          )
        ) : (
          // <span></span>
          <div className="loading-progress-bar">
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.userDetails.userData,
    otherUserData: state.otherUserDetails.otherUser
  };
};

export default connect(
  mapStateToProps,
  { getOtherUserInfo, removeUserProfile, getUserVisitedReviews }
)(SavedContacts);
