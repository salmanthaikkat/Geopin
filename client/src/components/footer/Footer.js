import React, { Component } from "react";
import facebook from "../../assets/facebook.png";
import googlePlus from "../../assets/google-plus.png";
import twitter from "../../assets/twitter.png";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <h2>&copy; Copyright 2016 Geopin</h2>
          </div>
          <div className="footer-social">
            <ul>
              <li>
                <img src={facebook} alt="facebook logo" />
              </li>
              <li>
                <img src={googlePlus} alt="google plus logo" />
              </li>
              <li>
                <img src={twitter} alt="twitter logo" />
              </li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
