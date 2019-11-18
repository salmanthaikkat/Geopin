import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import GooglePlacesAutocomplete, {
  geocodeByAddress
} from "react-google-places-autocomplete";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { setLatLng, setAddress } from "../../redux/actions/mapSearch";
import VisitorsReview from "../visitors-review/visitorsReview";
import "./searchResult.css";

const SearchResult = props => {
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

  if (props.auth.isLoggedIn) {
    return (
      <div className="search-main-container">
        <Navbar />
        <div className="search-container">
          <div className="search-place">
            <GooglePlacesAutocomplete
              inputClassName="input-search"
              onSelect={handleChangeMarker}
              placeholder={props.mapData.address}
            />
          </div>
        </div>
        <div className="map-container-search">
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
              title={props.mapData.address}
              name={props.mapData.address}
              position={{ lat: props.mapData.lat, lng: props.mapData.lng }}
            />
          </Map>
        </div>
        <VisitorsReview />
        <Footer />
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    mapData: state.mapSearch
  };
};

export default connect(
  mapStateToProps,
  {
    setAddress,
    setLatLng
  }
)(
  GoogleApiWrapper({
    apiKey: process.env.REACT_APP_MAP_API
  })(SearchResult)
);
