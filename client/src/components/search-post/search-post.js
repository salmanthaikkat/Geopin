import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { connect } from "react-redux";
import { Rating } from "@material-ui/lab";
import moment from "moment";
import "./search-post.scss";

const SearchPost = props => {
  const [keyword, setKeyword] = useState({});
  const [searchResult, setSearchResult] = useState([]);

  const searchInputHandler = e => {
    e.preventDefault();
    var filter = "placeName";
    var keyword = e.target.value;
    setKeyword(e.target.value);

    var filteredData = props.userData.visited.filter(function(obj) {
      if (keyword.length > 0) {
        return obj[filter].match(keyword);
      }
    });
    setSearchResult(filteredData);
  };

  return (
    <div>
      <div className="search-post-container">
        <input
          type="text"
          placeholder="Search your posts"
          onChange={searchInputHandler}
        ></input>
        <button>
          <SearchIcon />
        </button>
      </div>
      <div className="search-result-tab">
        <ul>
          <table>
            <tbody>
              {keyword.length > 0 ? (
                searchResult.length > 0 ? (
                  searchResult.map(review => {
                    return (
                      <tr>
                        <div className="main-strip">
                          <div className="strip-left">
                            <h4>{review.placeName}</h4>
                            <h4>{moment(review.created).format("ll")}</h4>
                          </div>
                          <div className="strip-right">
                            <Rating
                              size="small"
                              value={review.rating}
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
                  <div className="no-search-result">
                    <span>No Result</span>
                  </div>
                )
              ) : (
                <span></span>
              )}
            </tbody>
          </table>
        </ul>
      </div>
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
)(SearchPost);
