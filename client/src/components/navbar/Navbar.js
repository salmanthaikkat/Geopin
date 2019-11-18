import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import { getUserVisitedReviews } from "../../redux/actions/locationReviewAction";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import user from "../../assets/defaultUser.png";
import "./Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super();
    this.state = {
      name: ""
    };
    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser() {
    this.props.logoutUser();
  }

  componentDidMount() {
    this.props.getUserVisitedReviews();
  }

  render() {
    return (
      <header className="nav-container">
        <div className="nav-brand">
          <Link to="/home">
            <img src={logo} alt="geopin" />
          </Link>
        </div>
        <div className="nav-menu">
          <div className="nav-user-photo">
            {this.props.userData.profileImage ? (
              <Link to="/user-profile">
                <img
                  src={`${this.props.userData.profileImage}`}
                  alt="geopin-user"
                />
              </Link>
            ) : (
              <Link to="/user-profile">
                <img src={user} alt="geopin-user" />
              </Link>
            )}
          </div>
          <div className="nav-user-name">
            <Link to="/user-profile">
              <span className="user-name">{this.props.userData.name}</span>
            </Link>
          </div>
          <div className="nav-logout">
            <span className="logout-btn" onClick={this.logoutUser}>
              Log out
            </span>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userDetails.userData
  };
};

export default connect(
  mapStateToProps,
  { logoutUser, getUserVisitedReviews }
)(Navbar);
