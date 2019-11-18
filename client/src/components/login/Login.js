import React, { Component } from "react";
import { Link } from "react-router-dom";
import { loginUser, googleAuth } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Footer from "../footer/Footer";
import Grid from "@material-ui/core/Grid";
import { GoogleLogin } from "react-google-login";
import { IconButton } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import logo from "../../assets/logo.png";
import Input from "../input";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      fields: {},
      isLoading: false
    };
    this.formSubmit = this.formSubmit.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  onChangeListener = (field, e) => {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  };

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "This field is required";
    }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "This field is required";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  formSubmit = e => {
    e.preventDefault();
    if (this.handleValidation()) {
      this.setState({
        isLoading: true
      });
      this.props
        .loginUser({
          email: this.state.fields["email"],
          password: this.state.fields["password"]
        })
        .then(() => {
          this.setState({
            isLoading: false
          });
        });
    }
  };

  responseGoogle = response => {
    this.setState({
      isLoading: true
    });
    this.props.googleAuth(response.profileObj);
  };

  failureResponse = response => {
    console.log(response);
  };

  render() {
    if (this.props.auth.isLoggedIn) {
      return <Redirect to="/home" />;
    } else {
      return (
        <div className="container">
          <div className="logo-container">
            <Link to="/">
              <img src={logo} alt="geopin" />
            </Link>
          </div>
          <Grid item xs={12} sm={12}>
            <div className="login-form-container">
              <div className="login-form-heading">
                <span className="login-heading">login</span>
              </div>
              <div className="login-form">
                <form onSubmit={this.formSubmit}>
                  <Input
                    value={this.state.fields["email"]}
                    placeholder="Email"
                    type="email"
                    name="email"
                    refs="email"
                    className="login-input"
                    autoFocus="autoFocus"
                    onChange={this.onChangeListener.bind(this, "email")}
                  />
                  <br />
                  <span className="register-error">
                    {this.state.errors["email"]}
                  </span>
                  <br />
                  <Input
                    value={this.state.fields["password"]}
                    placeholder="Password"
                    type="password"
                    name="password"
                    refs="password"
                    className="login-input"
                    onChange={this.onChangeListener.bind(this, "password")}
                  />
                  <br />
                  <span className="register-error">
                    {this.state.errors["password"]}
                  </span>
                  <br />
                  {this.state.isLoading ? (
                    <CircularProgress />
                  ) : (
                    <button type="submit" className="login-btn">
                      login
                    </button>
                  )}
                  {this.props.auth.error ? (
                    <p className="login-error">{this.props.auth.error}</p>
                  ) : (
                    <span></span>
                  )}
                </form>
                <div className="social-auth">
                  <span className="social-auth-text">Login with</span>
                  <GoogleLogin
                    clientId="72224001257-krh9qj1g0banieelg6lvalle0uv7m011.apps.googleusercontent.com"
                    onSuccess={this.responseGoogle}
                    onFailure={this.failureResponse}
                    buttonText="Login"
                    render={renderProps => (
                      <IconButton
                        className="google-auth-btn"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        <FontAwesomeIcon icon={faGoogle} />
                      </IconButton>
                    )}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
                <p className="bottom-text">
                  Don't have an account?
                  <span> </span>
                  <Link to="/register">
                    <span>Register Now</span>
                  </Link>
                </p>
              </div>
            </div>
          </Grid>
          <Footer />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {
    loginUser,
    googleAuth
  }
)(Login);
