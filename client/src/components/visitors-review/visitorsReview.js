import React, { useState, useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import SearchReviewCard from "../search-review-card/searchReviewCard";
import API from "../../services/API_Service";
import { connect } from "react-redux";
import { getLocationReview } from "../../redux/actions/locationReviewAction";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";
import Menu from "@material-ui/core/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { getName } from "country-list";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import history from "../../history";
import "./visitorsReview.scss";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "grey"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 320,
    maxWidth: 380,
    backgroundColor: "white",
    border: "none"
  },
  customFormControl: {
    margin: theme.spacing(1),
    minWidth: 152,
    maxWidth: 182,
    backgroundColor: "white",
    border: "none"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  customSelect: {
    border: "none"
  }
}));

const VisitorsReview = props => {
  const classes = useStyles();
  const [reviews, setReviews] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [values, setValues] = React.useState({
    nationality: "",
    month: "",
    year: "",
    rating: ""
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function fetchReview() {
    let locationCoordinates = {
      latitude: props.mapData.lat,
      longitude: props.mapData.lng
    };
    const reviews = await API.call(
      "post",
      "location/getLocationReview",
      locationCoordinates
    );

    if (typeof reviews[0] !== "undefined") {
      props.getLocationReview(reviews[0].reviews);
      setReviews(reviews[0].reviews);
    } else {
      setReviews({});
    }
  }

  useEffect(() => {
    fetchReview();
  }, [props.mapData.lat, props.mapData.lng]);

  const filterReview = () => {
    var filterParams = {
      country: values.nationality,
      rating: values.rating,
      month: values.month,
      year: values.year
    };
    const results =
      props.locationReview.length > 0
        ? props.locationReview.filter(review => {
            var check = moment(review.created, "YYYY/MM/DD");
            var month = check.format("MM");
            var year = check.format("YYYY");
            return (
              (filterParams.country !== ""
                ? review.user_id.country === filterParams.country
                : review) &&
              (filterParams.rating !== ""
                ? review.rating === filterParams.rating
                : review) &&
              (filterParams.month !== ""
                ? month == filterParams.month
                : review) &&
              (filterParams.year !== "" ? year == filterParams.year : review)
            );
          })
        : null;

    setReviews(results);
    handleClose();
  };

  return (
    <div className="visitors-review-main">
      <div className="visitors-review-main-heading">
        <span>Recent visitors of {props.mapData.address}</span>
        <span className="review-filter-btn" onClick={handleClick}>
          <FontAwesomeIcon icon={faFilter} />
          Filter
        </span>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <div className="filter-main">
            <FormControl variant="standard" className={classes.formControl}>
              <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                Visitor's Nationality
              </InputLabel>
              <Select
                value={values.nationality}
                onChange={handleChange}
                labelWidth={labelWidth}
                inputProps={{
                  name: "nationality",
                  id: "outlined-age-simple"
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {props.locationReview.length > 0 ? (
                  props.locationReview.map(review => {
                    return (
                      <MenuItem value={review.user_id.country}>
                        {getName(review.user_id.country)}
                      </MenuItem>
                    );
                  })
                ) : (
                  <span></span>
                )}
              </Select>
            </FormControl>
            <br />
            <div className="filter-main-parallel-input">
              <FormControl
                variant="standard"
                className={classes.customFormControl}
              >
                <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                  Visited Month
                </InputLabel>
                <Select
                  value={values.month}
                  onChange={handleChange}
                  labelWidth={labelWidth}
                  inputProps={{
                    name: "month",
                    id: "outlined-age-simple"
                  }}
                  className={classes.customSelect}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>January</MenuItem>
                  <MenuItem value={2}>February</MenuItem>
                  <MenuItem value={3}>March</MenuItem>
                  <MenuItem value={4}>April</MenuItem>
                  <MenuItem value={5}>May</MenuItem>
                  <MenuItem value={6}>June</MenuItem>
                  <MenuItem value={7}>July</MenuItem>
                  <MenuItem value={8}>August</MenuItem>
                  <MenuItem value={9}>September</MenuItem>
                  <MenuItem value={10}>October</MenuItem>
                  <MenuItem value={11}>November</MenuItem>
                  <MenuItem value={12}>December</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                variant="standard"
                className={classes.customFormControl}
              >
                <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                  Visited Year
                </InputLabel>
                <Select
                  value={values.year}
                  onChange={handleChange}
                  labelWidth={labelWidth}
                  inputProps={{
                    name: "year",
                    id: "outlined-age-simple"
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={2018}>2018</MenuItem>
                  <MenuItem value={2019}>2019</MenuItem>
                  <MenuItem value={2020}>2020</MenuItem>
                </Select>
              </FormControl>
            </div>
            <FormControl variant="standard" className={classes.formControl}>
              <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                Visitor's rating
              </InputLabel>
              <Select
                value={values.rating}
                onChange={handleChange}
                labelWidth={labelWidth}
                inputProps={{
                  name: "rating",
                  id: "outlined-age-simple"
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={0.5}>0.5</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={1.5}>1.5</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={2.5}>2.5</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={3.5}>3.5</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={4.5}>4.5</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
            <br />
            <button onClick={filterReview}>done</button>
          </div>
        </Menu>
      </div>
      <div>
        <Grid container spacing={2}>
          {reviews ? (
            reviews.length > 0 ? (
              reviews
                .slice(0)
                .reverse()
                .map(review => (
                  <Grid
                    item
                    sm={12}
                    md={6}
                    xs={12}
                    key={review._id}
                    className="custom-grid-items"
                  >
                    <SearchReviewCard
                      profileImage={review.user_id.profileImage}
                      name={review.user_id.name}
                      phone={review.user_id.phone}
                      date={moment(review.created).format("ll")}
                      rating={review.rating}
                      onClick={() => {
                        if (props.userDetails._id == review.user_id._id) {
                          history.push("/user-profile");
                        } else {
                          history.push(
                            `/visitor-profile/${review.user_id._id}`
                          );
                        }
                      }}
                    />
                  </Grid>
                ))
            ) : (
              <div className="search-no-reviews-section">
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="no-data-icon"
                />
                <span>No Reviews available</span>
              </div>
            )
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    mapData: state.mapSearch,
    locationReview: state.locationReview.reviews,
    userDetails: state.userDetails.userData
  };
};

export default connect(
  mapStateToProps,
  { getLocationReview }
)(VisitorsReview);
