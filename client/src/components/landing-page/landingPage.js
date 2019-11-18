import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import AnchorLink from "react-anchor-link-smooth-scroll";
import CircularProgress from "@material-ui/core/CircularProgress";
import logo from "../../assets/logo_landing_page_banner.png";
import checkInLogo from "../../assets/check_in_icon.png";
import contactIcon from "../../assets/contact_icon.png";
import serachIcon from "../../assets/search_location_icon.png";
import { sendMail } from "../../redux/actions/contactActions";
import { connect } from "react-redux";
import Input from "../input";
import { Redirect } from "react-router-dom";
import "./landingPage.css";

const LandingPage = props => {
  const [inputs, setInputs] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e => {
    e.persist();
    setInputs(inputs => ({
      ...inputs,
      [e.target.name]: e.target.value
    }));
  };

  const formSubmit = e => {
    setIsLoading(true);
    e.preventDefault();
    props.sendMail(inputs).then(() => {
      setIsLoading(false);
    });
  };

  const getStarted = () => {
    props.history.push("/register");
  };

  if (props.auth.isLoggedIn) {
    return <Redirect to="/home" />;
  } else {
    return (
      <div className="landing-main">
        <header>
          <div className="header-nav">
            <ul>
              <li>
                <AnchorLink href="#how_it_works">How It Works</AnchorLink>
              </li>
              <li>
                <AnchorLink href="#contact">Contact</AnchorLink>
              </li>
              <li className="login-nav-btn">
                <Link to="/login">LOGIN</Link>
              </li>
            </ul>
          </div>
          <br />
          <div className="header-main-logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="header-description">
            <h2>know your destination and pin your routes</h2>
            <button className="header-desc-btn" onClick={getStarted}>
              get started
            </button>
          </div>
        </header>
        <section className="section-desc" id="how_it_works">
          <div className="section-heading">
            <h3>how it works</h3>
            <span>Some instructions and suggestions</span>
          </div>
          <div className="card-container">
            <div className="section-cards">
              <div className="section-card">
                <div className="card-img">
                  <img src={serachIcon} alt="Search icon" />
                </div>
                <div className="card-title">Search Location</div>
                <div className="card-desc">
                  Ut tempus faucibus sapien, quis pulvinar massa feugiat vel.
                  Praesent non blandit , quis pulvinar massa feugiat vel.
                  Praesent non blandit
                </div>
              </div>

              <div className="section-card">
                <div className="card-img">
                  <img src={checkInLogo} alt="Checkin icon" />
                </div>
                <div className="card-title">Check in Your Location</div>
                <div className="card-desc">
                  Ut tempus faucibus sapien, quis pulvinar massa feugiat vel.
                  Praesent non blandit , quis pulvinar massa feugiat vel.
                  Praesent non blandit
                </div>
              </div>

              <div className="section-card">
                <div className="card-img">
                  <img src={contactIcon} alt="Search icon" />
                </div>
                <div className="card-title">Contact Visitors</div>
                <div className="card-desc">
                  Ut tempus faucibus sapien, quis pulvinar massa feugiat vel.
                  Praesent non blandit , quis pulvinar massa feugiat vel.
                  Praesent non blandit
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-contact" id="contact">
          <div className="section-contact-heading">
            <h2>contact</h2>
          </div>
          <div className="section-contact-main">
            <div className="section-contact-form">
              <form onSubmit={formSubmit}>
                <Input
                  placeholder="Name"
                  type="text"
                  name="name"
                  refs="name"
                  onChange={handleChange}
                  required="required"
                  className="contact-input"
                />
                <br />
                <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  refs="email"
                  onChange={handleChange}
                  required="required"
                  className="contact-input"
                />
                <br />
                <textarea
                  placeholder="Message"
                  name="message"
                  refs="message"
                  onChange={handleChange}
                  className="contact-textarea"
                  required
                ></textarea>
                <br />
                {isLoading ? <CircularProgress /> : <button>send</button>}
                <br />
                <br />
                {props.contact.message ? (
                  <span className="login-error">{props.contact.message}</span>
                ) : (
                  <span></span>
                )}
              </form>
            </div>
            <div className="section-contact-details">
              <div className="section-contact-desc">
                <table>
                  <tbody>
                    <tr>
                      <td>Email</td>
                      <td>:</td>
                      <td>geo@geo.com</td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>:</td>
                      <td>+92 99647564788412 </td>
                    </tr>
                    <tr>
                      <td>Skype</td>
                      <td>:</td>
                      <td>geopinlogger</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>:</td>
                      <td>
                        Building name, Streetname and Zip code <br />
                        885865424
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    contact: state.contact,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {
    sendMail
  }
)(LandingPage);
