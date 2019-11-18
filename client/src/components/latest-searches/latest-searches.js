import React from "react";
import { Rating } from "@material-ui/lab";
import { connect } from "react-redux";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./latest-searches.scss";

const LatestSearches = props => {
  return (
    <div className="latest-search-container">
      <table>
        <thead>
          <tr>
            <h4>Latest Post</h4>
          </tr>
        </thead>
        <tbody>
          {props.userData.visited ? (
            props.userData.visited.length !== 0 ? (
              props.userData.visited
                .slice(-3)
                .reverse()
                .map(visited => {
                  return (
                    <tr>
                      <div
                        className="main-strip"
                        onClick={() => {
                          console.log(visited);
                        }}
                      >
                        <div className="strip-left">
                          <h4>{visited.placeName}</h4>
                          <h4 className="strip-left-date">
                            {moment(visited.created).format("ll")}
                          </h4>
                        </div>
                        <div className="strip-right">
                          <Rating
                            size="small"
                            value={visited.rating}
                            precision={0.5}
                            size="small"
                            readOnly
                          />
                        </div>
                      </div>
                    </tr>
                  );
                })
            ) : (
              <div className="no-latest-post">
                <span>No post available</span>
              </div>
            )
          ) : (
            <div className="loading-progress-bar">
              <CircularProgress />
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.userDetails.userData
  };
};

export default connect(
  mapStateToProps,
  {}
)(LatestSearches);
