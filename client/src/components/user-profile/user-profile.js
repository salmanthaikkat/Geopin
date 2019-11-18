import React, { useState, useEffect, Suspense } from "react";
import NavBar from "../navbar/Navbar";
import ReactCountryFlag from "react-country-flag";
import {
  getUserVisitedReviews,
  editUserProfile
} from "../../redux/actions/locationReviewAction";
import { getName } from "country-list";
import ReactFlagsSelect from "react-flags-select";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import LatestSearches from "../latest-searches/latest-searches";
import LazyLoad from "react-lazyload";
import SearchPost from "../search-post/search-post";
import SavedContacts from "../saved-contacts/saved-contacts";
import user from "../../assets/defaultUser.png";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserReviewCard from "../user-review-card/user-review-card";
import {
  faExclamationTriangle,
  faPen
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../footer/Footer";
import moment from "moment";
import "./user-profile.scss";

const UserProfile = props => {
  const [name, setName] = useState(props.userData.name);
  const [email, setEmail] = useState(props.userData.email);
  const [phone, setPhone] = useState(props.userData.phone);
  const [country, setCountry] = useState(props.userData.country);
  const [profileImage, setProfileImage] = useState(null);
  const [uploadImageFile, setUploadImageFile] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [pictureErrorMessage, setPictureErrorMessage] = useState();
  const [nameErrorMessage, setNameErrorMessage] = useState();
  const [emailErrorMessage, setEmailErrorMessage] = useState();
  const [phoneErrorMessage, setPhoneErrorMessage] = useState();
  const [isValidModal, setValidModal] = useState(false);

  const handleNameChange = e => {
    e.preventDefault();
    setName(e.target.value);
    if (e.target.value.length > 0) {
      setNameErrorMessage("");
    } else {
      setNameErrorMessage("Please provide a name");
    }
  };

  const handleEmailChange = e => {
    e.preventDefault();
    setEmail(e.target.value);
    if (e.target.value.length > 0) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(e.target.value).toLowerCase())) {
        setEmailErrorMessage("");
      } else {
        setEmailErrorMessage("Please provide a valid email");
      }
    } else {
      setEmailErrorMessage("Please provide a valid email");
    }
  };

  const handlePhoneChange = e => {
    e.preventDefault();
    setPhone(e.target.value);
    if (e.target.value.length > 0) {
      setPhoneErrorMessage("");
    } else {
      setPhoneErrorMessage("Please provide a valid email");
    }
  };

  const onSelectFlag = countryCode => {
    setCountry(countryCode);
  };

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
    setName(props.userData.name);
    setEmail(props.userData.email);
    setPhone(props.userData.phone);
    setCountry(props.userData.country);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleImageUpload = event => {
    if (event.target.files[0]) {
      if (
        event.target.files[0].type == "image/png" ||
        event.target.files[0].type == "image/jpeg"
      ) {
        setPictureErrorMessage("");
        setProfileImage(URL.createObjectURL(event.target.files[0]));
        setUploadImageFile(event.target.files[0]);
      } else {
        setPictureErrorMessage("Please select a valid image file");
      }
    }
  };

  const editFormSubmit = event => {
    event.preventDefault();

    let userForm = new FormData();
    userForm.append("name", name);
    userForm.append("email", email);
    userForm.append("phone", phone);
    userForm.append("country", country);
    userForm.append("profilePic", uploadImageFile);

    props.editUserProfile(userForm);
    setOpenEditModal(false);
  };

  useEffect(() => {
    props.getUserVisitedReviews();
  }, [props.upadateError]);

  if (props.auth.isLoggedIn) {
    return (
      <div className="user-profile-container">
        <NavBar />
        <div className="user-profile-header-section">
          <div className="user-profile-info-left">
            <div className="user-profile-img-circle">
              {props.userData.profileImage ? (
                <img
                  src={`${props.userData.profileImage}`}
                  alt="geopin-user-profile-image"
                />
              ) : (
                <img src={user} alt="" />
              )}
            </div>
            <div className="user-profile-tab">
              <div className="user-profile-desc">
                <h3>{props.userData.name}</h3>
                <h4>{props.userData.email}</h4>
              </div>
              <div className="user-country-info">
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
                  <span></span>
                )}
              </div>
            </div>
          </div>
          <div className="user-profile-info-right">
            <h5>Contact Number</h5>
            {props.userData.phone ? (
              props.userData.phone !== "N/A" ? (
                <h3>{props.userData.phone}</h3>
              ) : (
                <h3 className="no-phone-text">Please add phone number</h3>
              )
            ) : (
              <span></span>
            )}
          </div>
        </div>
        <div className="user-profile-edit-btn">
          <button onClick={handleOpenEditModal}>Edit</button>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className="edit-modal"
          open={openEditModal}
          onClose={handleCloseEditModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={openEditModal}>
            <div className="edit-content-modal">
              <div className="user-edit-modal-title">
                <h2>Edit Profile</h2>
              </div>
              <hr />
              <form>
                <div className="user-profile-pic-upload">
                  <label htmlFor="file-input">
                    {props.userData.profileImage ? (
                      <div>
                        <img
                          src={
                            profileImage
                              ? profileImage
                              : `${props.userData.profileImage}`
                          }
                          alt=""
                          className="user-image-preview"
                        />
                        <FontAwesomeIcon
                          icon={faPen}
                          className="profile-img-edit-btn-icon"
                        />
                      </div>
                    ) : (
                      <div>
                        <img
                          src={profileImage ? profileImage : user}
                          className="user-image-preview"
                        />
                        <FontAwesomeIcon
                          icon={faPen}
                          className="profile-img-edit-btn-icon"
                        />
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    id="file-input"
                    name="file-select"
                    onChange={handleImageUpload}
                    required="required"
                  />
                  {pictureErrorMessage ? (
                    <div className="picture-error-msg">
                      {pictureErrorMessage}
                    </div>
                  ) : (
                    <span></span>
                  )}
                </div>

                <div className="user-edit-form-field">
                  <label htmlFor="name">Name</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={handleNameChange}
                    required="required"
                  />
                  {nameErrorMessage ? (
                    <div className="modal-error-msg">{nameErrorMessage}</div>
                  ) : (
                    <span />
                  )}
                  <br />
                  <label htmlFor="phone">Phone Number</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Phone number"
                    value={phone}
                    onChange={handlePhoneChange}
                    required="required"
                  />
                  {phoneErrorMessage ? (
                    <div className="modal-error-msg">{phoneErrorMessage}</div>
                  ) : (
                    <span />
                  )}
                  <br />
                  <label htmlFor="email">Email</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    required="required"
                  />
                  {emailErrorMessage ? (
                    <div className="modal-error-msg">{emailErrorMessage}</div>
                  ) : (
                    <span></span>
                  )}
                  <br />
                  <label htmlFor="Nationality">Nationality</label>
                  <div className="user-profile-nationality-select">
                    <ReactFlagsSelect
                      defaultCountry={country}
                      onSelect={onSelectFlag}
                    />
                  </div>
                </div>
              </form>
              <div className="user-edit-done-btn">
                <button
                  type="submit"
                  onClick={e => {
                    e.preventDefault();
                    setOpenEditModal(false);
                  }}
                  className="cancel-edit-btn"
                >
                  cancel
                </button>
                {nameErrorMessage ||
                pictureErrorMessage ||
                phoneErrorMessage ||
                emailErrorMessage ? (
                  <button
                    onClick={editFormSubmit}
                    className="submit_btn--disabled"
                  >
                    done
                  </button>
                ) : (
                  <button onClick={editFormSubmit}>done</button>
                )}
              </div>
            </div>
          </Fade>
        </Modal>
        <div className="user-profile-content">
          <div className="user-profile-content-left">
            <SearchPost />
            <LatestSearches />
            <SavedContacts />
          </div>
          <div className="user-profile-content-right">
            {props.userData.visited ? (
              props.userData.visited.length !== 0 ? (
                props.userData.visited.map(visited => {
                  return (
                    // <Suspense fallback={<CircularProgress disableShrink />}>
                    //   <UserReviewCard
                    //     placeName={visited.placeName}
                    //     rating={visited.rating}
                    //     review={visited.description}
                    //     lat={visited.latitude}
                    //     lng={visited.longitude}
                    //     date={moment(visited.created).format("ll")}
                    //   />
                    // </Suspense>

                    <LazyLoad
                      height={200}
                      offset={[-200, 200]}
                      debounce={false}
                      throttle={1000}
                    >
                      <UserReviewCard
                        placeName={visited.placeName}
                        rating={visited.rating}
                        review={visited.description}
                        lat={visited.latitude}
                        lng={visited.longitude}
                        date={moment(visited.created).format("ll")}
                      />
                    </LazyLoad>
                  );
                })
              ) : (
                <div className="no-reviews-section">
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="no-data-icon"
                  />
                  <span>No Reviews</span>
                </div>
              )
            ) : (
              <span>No Data available</span>
            )}
          </div>
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
    userData: state.userDetails.userData,
    auth: state.auth,
    upadateError: state.userDetails.message
  };
};

export default connect(
  mapStateToProps,
  { getUserVisitedReviews, editUserProfile }
)(UserProfile);
