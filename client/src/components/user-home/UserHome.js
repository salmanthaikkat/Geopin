import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "@material-ui/core/Modal";
import GooglePlacesAutocomplete, {
  geocodeByAddress
} from "react-google-places-autocomplete";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { setLatLng, setAddress } from "../../redux/actions/mapSearch";
import "./UserHome.css";

const UserHome = props => {
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [openCheckinModal, setOpenCheckinModal] = useState(false);
  const [address, setAddress] = useState();

  const handleOpenSearchModal = () => {
    setOpenSearchModal(true);
  };

  const handleCloseSearchModal = () => {
    setOpenSearchModal(false);
  };

  const handleOpenCheckinModal = () => {
    setOpenCheckinModal(true);
  };

  const handleCloseCheckinModal = () => {
    setOpenCheckinModal(false);
  };

  const handleSearchSelect = value => {
    setAddress(value.description);
    geocodeByAddress(value.description)
      .then(results => {
        let latlng = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        };
        props.setAddress(value.description);
        props.setLatLng(latlng);
        props.history.push("/search");
      })
      .catch(error => console.error("Error", error));
  };

  const handleCheckinSelect = value => {
    setAddress(value.description);
    geocodeByAddress(value.description)
      .then(results => {
        let latlng = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        };
        props.setAddress(value.description);
        props.setLatLng(latlng);
        props.history.push("/checkin");
      })
      .catch(error => console.error("Error", error));
  };

  if (props.auth.isLoggedIn) {
    return (
      <div className="home-main">
        <Navbar />
        <div className="home-container">
          <div className="home-heading">
            <h2>
              Do you need to check in your <span>location</span> or <br />
              find a new <span>destination</span>?
            </h2>
          </div>
          <br />
          <div className="home-buttons">
            <button onClick={handleOpenSearchModal}>search</button>
            <button onClick={handleOpenCheckinModal}>check in</button>
          </div>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className="search-modal"
          open={openSearchModal}
          onClose={handleCloseSearchModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={openSearchModal}>
            <div className="search-content-modal">
              <span id="transition-modal-title">
                Please select the option. Need to Check in your <br />
                location or find a new destination?
              </span>
              <form>
                <GooglePlacesAutocomplete
                  onSelect={handleSearchSelect}
                  placeholder="Search location"
                />
              </form>
            </div>
          </Fade>
        </Modal>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className="search-modal"
          open={openCheckinModal}
          onClose={handleCloseCheckinModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={openCheckinModal}>
            <div className="search-content-modal">
              <span id="transition-modal-title">
                Please select the option. Need to Check in your <br />
                location or find a new destination?
              </span>
              <form>
                <GooglePlacesAutocomplete
                  onSelect={handleCheckinSelect}
                  placeholder="Type your login location"
                />
              </form>
            </div>
          </Fade>
        </Modal>
        <Footer />
      </div>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { setLatLng, setAddress }
)(UserHome);
