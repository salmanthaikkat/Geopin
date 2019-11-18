import React from "react";
import { Rating } from "@material-ui/lab";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import "./user-review-card.scss";

const UserReviewCard = props => {
  return (
    <div className="user-review-card-container">
      <div className="user-review-card-header">
        <div className="card-header-left">
          <h4>{props.placeName}</h4>
          <h5>{props.placeName}</h5>
        </div>
        <div className="card-header-right">
          <h5>{props.date}</h5>
          <Rating size="small" value={props.rating} precision={0.5} readOnly />
        </div>
      </div>
      <div className="user-review-card-map">
        <Map
          google={props.google}
          style={{ maxWidth: "500px", height: "200px" }}
          initialCenter={{
            lat: props.lat,
            lng: props.lng
          }}
          zoom={15}
        >
          <Marker
            title={"props.mapData.address"}
            name={"props.mapData.address"}
            position={{
              lat: props.lat,
              lng: props.lng
            }}
          />
        </Map>
      </div>
      <div className="user-review-card-description">
        <h4>{props.review}</h4>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_API
})(UserReviewCard);
