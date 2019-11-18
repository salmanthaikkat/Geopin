import React, { useEffect, useState } from "react";
import NavBar from "../navbar/Navbar";
import ReactCountryFlag from "react-country-flag";
import { getName } from "country-list";
import { Grid } from "@material-ui/core";
import {
  getOtherUserProfile,
  saveUserProfile,
  getUserVisitedReviews,
  removeUserProfile
} from "../../redux/actions/locationReviewAction";
import VisitorReviewCard from "../visitors-review-card/visitors-review-card";
import CircularProgress from "@material-ui/core/CircularProgress";
import user from "../../assets/defaultUser.png";
import { connect } from "react-redux";
import moment from "moment";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import Footer from "../footer/Footer";
import { green } from "@material-ui/core/colors";
import "./visitor-profile.scss";

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20,
    width: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["error", "success"]).isRequired
};

const VisitorPage = props => {
  const [openSuccessSnackBar, setOpenSuccessSnackBar] = useState(false);
  const [openFailureSnackBar, setOpenFailureSnackBar] = useState(false);

  let savedLength;

  if (props.userProfile.saved) {
    savedLength = props.userProfile.saved.length;
  } else {
    savedLength = null;
  }

  useEffect(() => {
    let user_id = props.match.params.id;
    props.getOtherUserProfile(user_id);
    props.getUserVisitedReviews();
  }, [savedLength]);

  const saveContactAction = () => {
    if (props.userProfile.saved) {
      if (props.userProfile.saved.indexOf(props.match.params.id) !== -1) {
        console.log("Already friend");
        setOpenFailureSnackBar(true);
      } else {
        setOpenSuccessSnackBar(true);
        props.saveUserProfile(props.match.params.id);
      }
    }
  };

  const removeContactAction = () => {
    //setOpenFailureSnackBar(true);
    props.removeUserProfile(props.match.params.id);
  };

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessSnackBar(false);
  }

  if (props.auth.isLoggedIn) {
    return (
      <div className="visitor-profile-container">
        <NavBar />
        <div className="visitor-profile-header-section">
          <div className="visitor-profile-info-left">
            <div className="visitor-profile-img-circle">
              {props.userData.profileImage ? (
                <img
                  src={`${props.userData.profileImage}`}
                  alt="user-profile-image"
                />
              ) : (
                <img src={user} alt="user-profile-image" />
              )}
            </div>
            <div className="visitor-profile-tab">
              <div className="visitor-profile-desc">
                <h3>
                  {props.userData ? props.userData.name : <span>N/A</span>}
                </h3>
                <h4>{props.userData.email}</h4>
              </div>
              <div className="visitor-country-info">
                <ReactCountryFlag
                  styleProps={{
                    width: "35px",
                    height: "35px"
                  }}
                  code={props.userData.country}
                  svg
                />
                {props.userData.country ? (
                  <h3 className="user-country-name">
                    {getName(props.userData.country)}
                  </h3>
                ) : (
                  <span>No Data</span>
                )}
              </div>
            </div>
          </div>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={openSuccessSnackBar}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <MySnackbarContentWrapper
              onClose={handleClose}
              variant="success"
              message="Contact Saved!"
            />
          </Snackbar>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={openFailureSnackBar}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <MySnackbarContentWrapper
              onClose={handleClose}
              variant="error"
              message="Contact Removed"
            />
          </Snackbar>
          <div className="visitor-details">
            <div className="visitor-profile-info-right">
              <h5>Contact Number</h5>
              {props.userData.phone ? (
                props.userData.phone !== "N/A" ? (
                  <h3>{props.userData.phone}</h3>
                ) : (
                  <h3 className="visitor-no-phone-text">
                    Phone number not available
                  </h3>
                )
              ) : (
                <span></span>
              )}
            </div>
            {props.userProfile.saved && props.userData ? (
              props.userProfile.saved.length > 0 ? (
                props.userProfile._id == props.match.params.id ? (
                  <div className="save-contact-btn-disabled">
                    <button disabled>Save contact</button>
                  </div>
                ) : props.userProfile.saved.indexOf(props.match.params.id) !==
                  -1 ? (
                  <div className="remove-contact-btn">
                    <button onClick={removeContactAction}>
                      Remove contact
                    </button>
                  </div>
                ) : (
                  <div className="save-contact-btn">
                    <button onClick={saveContactAction}>Save contact</button>
                  </div>
                )
              ) : (
                <div className="save-contact-btn">
                  <button onClick={saveContactAction}>Save contact</button>
                </div>
              )
            ) : (
              <span>No Data available</span>
            )}
          </div>
        </div>
        <div className="visitor-page-content">
          <Grid container spacing={2}>
            {props.userData.visited ? (
              props.userData.visited.length > 0 ? (
                props.userData.visited.map(visited => {
                  return (
                    <Grid
                      item
                      sm={12}
                      md={6}
                      xs={12}
                      className="custom-grid-items"
                    >
                      <VisitorReviewCard
                        name={visited.placeName}
                        date={moment(visited.created).format("ll")}
                        rating={visited.rating}
                        review={visited.description}
                        latitude={visited.latitude}
                        longitude={visited.longitude}
                      />
                    </Grid>
                  );
                })
              ) : (
                <CircularProgress />
              )
            ) : (
              <span>No Reviews Available</span>
            )}
          </Grid>
        </div>
        <Footer />
      </div>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

const mapStateToProps = state => {
  return {
    userData: state.locationReview.otherData,
    userProfile: state.userDetails.userData,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {
    getOtherUserProfile,
    saveUserProfile,
    getUserVisitedReviews,
    removeUserProfile
  }
)(VisitorPage);
