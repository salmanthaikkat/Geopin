import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import { green } from "@material-ui/core/colors";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import GooglePlacesAutocomplete, {
  geocodeByAddress
} from "react-google-places-autocomplete";
import Modal from "@material-ui/core/Modal";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Rating } from "@material-ui/lab";
import { setLatLng, setAddress } from "../../redux/actions/mapSearch";
import { locationCheckin } from "../../redux/actions/locationCheckin";
import "./checkinResult.scss";

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

const CheckinResult = props => {
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState(2);
  const [description, setDescription] = useState();
  const [openSuccessSnackBar, setOpenSuccessSnackBar] = React.useState(false);

  function handleClick() {
    setOpenSuccessSnackBar(true);
  }

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccessSnackBar(false);
  }

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChangeMarker = address => {
    geocodeByAddress(address.description)
      .then(results => {
        let latlng = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        };
        props.setAddress(address.description);
        props.setLatLng(latlng);
      })
      .catch(error => console.error("Error", error));
  };

  const formSubmit = e => {
    e.preventDefault();
    let data = {
      name: props.mapData.address,
      latitude: props.mapData.lat,
      longitude: props.mapData.lng,
      description: description,
      rating: value
    };
    props.locationCheckin(data);
    if (!props.location.error) {
      handleCloseModal();
      handleClick();
    }
  };

  if (props.auth.isLoggedIn) {
    return (
      <div>
        <Navbar />
        <div className="checkin-container">
          <div className="checkin-place">
            <GooglePlacesAutocomplete
              inputClassName="autocomplete-input"
              onSelect={handleChangeMarker}
              placeholder="Search Location"
              initialValue={props.mapData.address}
            />
            <button onClick={handleOpenModal}>check in</button>
          </div>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className="checkin-modal"
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={openModal}>
            <div className="checkin-content-modal">
              <form onSubmit={formSubmit}>
                <table>
                  <tbody>
                    <tr>
                      <textarea
                        placeholder="Add your description"
                        onChange={e => {
                          setDescription(e.target.value);
                        }}
                        required
                      />
                    </tr>
                    <tr>
                      <hr />
                      <div className="rating-field">
                        <div className="rating-field-title">
                          <h4>Rate the location</h4>
                        </div>
                        <div className="rating-field-star">
                          <Rating
                            name="half-rating"
                            value={value}
                            precision={0.5}
                            onChange={(event, newValue) => {
                              setValue(newValue);
                            }}
                          />
                        </div>
                      </div>
                    </tr>
                  </tbody>
                </table>
                <div className="description-done-btn">
                  <button type="submit">Done</button>
                </div>
              </form>
            </div>
          </Fade>
        </Modal>
        <div className="map-container">
          <Map
            google={props.google}
            zoom={15}
            style={{ width: "100%", height: "100%" }}
            initialCenter={{ lat: props.mapData.lat, lng: props.mapData.lng }}
            center={{
              lat: props.mapData.lat,
              lng: props.mapData.lng
            }}
          >
            <Marker
              name={"Current Location"}
              position={{ lat: props.mapData.lat, lng: props.mapData.lng }}
            >
              <InfoWindow>
                <div>
                  <h2>Hello</h2>
                </div>
              </InfoWindow>
            </Marker>
          </Map>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={openSuccessSnackBar}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <MySnackbarContentWrapper
            onClose={handleClose}
            variant="success"
            message="Review Added!"
          />
        </Snackbar>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    mapData: state.mapSearch,
    location: state.location
  };
};

export default connect(
  mapStateToProps,
  {
    setAddress,
    setLatLng,
    locationCheckin
  }
)(
  GoogleApiWrapper({
    apiKey: process.env.REACT_APP_MAP_API
  })(CheckinResult)
);
