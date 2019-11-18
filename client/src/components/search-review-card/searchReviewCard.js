import React from "react";
import { Rating } from "@material-ui/lab";
import userLogo from "../../assets/defaultUser.png";
import "./searchReviewCard.scss";

const SearchReviewCard = props => {
  return (
    <div className="search-review-card-main" onClick={props.onClick}>
      <div className="review-card-image">
        <img src={props.profileImage ? `${props.profileImage}` : userLogo} />
      </div>
      <div className="review-card-info">
        <p>{props.name}</p>
        <p>Call : {props.phone}</p>
      </div>
      <div className="review-card-rating-info">
        <p>{props.date}</p>
        <Rating value={props.rating} precision={0.5} readOnly />
      </div>
    </div>
  );
};

export default SearchReviewCard;
