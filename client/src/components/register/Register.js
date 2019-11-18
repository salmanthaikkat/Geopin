import React, { Component } from "react";
import ReactFlagsSelect from "react-flags-select";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import logo from "../../assets/logo.png";
import Footer from "../footer/Footer";
import Input from "../input";
import "react-flags-select/css/react-flags-select.css";
import "./Register.css";
import API from "../../services/API_Service";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "IN",
      loading: false,
      errorLoading: false,
      error: "",
      fields: {},
      errors: {}
    };
    this.onChangeListener = this.onChangeListener.bind(this);
    this.onSelectFlag = this.onSelectFlag.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name validation
    if (fields["name"] && fields["name"].trim().length === 0) {
      formIsValid = false;
      errors["name"] = "Name is required";
    }

    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Name is required";
    }

    //Email validation
    if (fields["email"] && fields["email"].trim().length === 0) {
      formIsValid = false;
      errors["email"] = "Email is required";
    }

    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Email is required";
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Invalid Email";
      }
    }

    //Phone number validation
    if (fields["phone"] && fields["phone"].trim().length === 0) {
      formIsValid = false;
      errors["phone"] = "Phone number is required";
    }

    if (!fields["phone"]) {
      formIsValid = false;
      errors["phone"] = "Phone number is required";
    }

    if (typeof fields["phone"] !== "undefined") {
      if (fields["phone"].length < 10) {
        formIsValid = false;
        errors["phone"] = "Phone number is short";
      }
    }

    if (typeof fields["phone"] !== "undefined") {
      if (fields["phone"] < 0) {
        formIsValid = false;
        errors["phone"] = "Invalid phone number";
      }
    }

    //Password validation
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "Password is required";
    }

    if (typeof fields["password"] !== "undefined") {
      if (
        !fields["password"].match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
      ) {
        formIsValid = false;
        errors["password"] =
          "Password must be 6 to 20 characters which contain atleast one digit, one uppercase and one lowercase letter";
      }
    }

    if (!fields["cPassword"]) {
      formIsValid = false;
      errors["cPassword"] = "Confirm password is required";
    }

    if (typeof fields["cPassword"] !== "undefined") {
      if (fields["cPassword"] !== fields["password"]) {
        formIsValid = false;
        errors["cPassword"] = "Password and confirm password doesn't match";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  onChangeListener(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  onSelectFlag(countryCode) {
    this.setState({
      country: countryCode
    });
  }

  async formSubmit(e) {
    e.preventDefault();
    let userData = {
      name: this.state.fields["name"],
      email: this.state.fields["email"],
      country: this.state.country,
      phone: this.state.fields["phone"],
      password: this.state.fields["password"]
    };
    if (this.handleValidation()) {
      this.setState({
        loading: true
      });
      const response = await API.call("post", "auth/register", userData);
      console.log(response);
      if (response.success == true) {
        this.props.history.push("/login");
      } else {
        this.setState({
          loading: false,
          errorLoading: true,
          error: response.message
        });
      }
    }
  }

  render() {
    if (this.props.auth.isLoggedIn) {
      return <Redirect to="/home" />;
    } else {
      return (
        <div className="main-container">
          <div className="logo-container">
            <Link to="/">
              <img src={logo} alt="geopin" />
            </Link>
          </div>
          <Grid item xs={12} sm={12}>
            <div className="register-form-container">
              <div className="register-form-heading">
                <span className="register-heading">register</span>
              </div>
              <div className="register-form">
                <form onSubmit={this.formSubmit}>
                  <Input
                    value={this.state.fields["name"]}
                    placeholder="Name"
                    type="text"
                    name="name"
                    autoFocus="autoFocus"
                    onChange={this.onChangeListener.bind(this, "name")}
                    refs="name"
                    className="register-input"
                    maxLength="18"
                  />
                  <br />
                  {this.state.errors["name"] ? (
                    <div>
                      <span className="register-error">
                        {this.state.errors["name"]}
                      </span>
                      <br />
                    </div>
                  ) : (
                    <span></span>
                  )}
                  <Input
                    value={this.state.fields["email"]}
                    placeholder="Email"
                    type="email"
                    name="email"
                    refs="email"
                    className="register-input"
                    onChange={this.onChangeListener.bind(this, "email")}
                  />
                  <br />
                  {this.state.errors["email"] ? (
                    <div>
                      <span className="register-error">
                        {this.state.errors["email"]}
                      </span>
                      <br />
                    </div>
                  ) : (
                    <span></span>
                  )}
                  <div className="select-flag-div">
                    <ReactFlagsSelect
                      placeholder=""
                      defaultCountry="IN"
                      selectedSize={26}
                      optionsSize={14}
                      className="select-country"
                      onSelect={this.onSelectFlag}
                      showSelectedLabel={false}
                    />
                  </div>
                  <Input
                    value={this.state.fields["phone"]}
                    placeholder="Phone Number"
                    type="number"
                    name="phone"
                    refs="phone"
                    onChange={this.onChangeListener.bind(this, "phone")}
                    className="phone-input"
                  />
                  <br />
                  {this.state.errors["phone"] ? (
                    <div>
                      <span className="register-error">
                        {this.state.errors["phone"]}
                      </span>
                      <br />
                    </div>
                  ) : (
                    <span></span>
                  )}

                  <Input
                    value={this.state.fields["password"]}
                    placeholder="Password"
                    type="password"
                    name="password"
                    refs="password"
                    className="register-input"
                    onChange={this.onChangeListener.bind(this, "password")}
                  />
                  <br />
                  {this.state.errors["password"] ? (
                    <div>
                      <span className="register-error">
                        {this.state.errors["password"]}
                      </span>
                      <br />
                    </div>
                  ) : (
                    <span></span>
                  )}

                  <Input
                    value={this.state.fields["cPassword"]}
                    placeholder="Confirm password"
                    type="password"
                    name="cPassword"
                    refs="cPassword"
                    className="register-input"
                    onChange={this.onChangeListener.bind(this, "cPassword")}
                  />
                  <br />
                  {this.state.errors["cPassword"] ? (
                    <div>
                      <span className="register-error">
                        {this.state.errors["cPassword"]}
                      </span>
                      <br />
                    </div>
                  ) : (
                    <span></span>
                  )}

                  {this.state.loading ? (
                    <CircularProgress />
                  ) : (
                    <button type="submit" className="register-btn">
                      create account
                    </button>
                  )}
                  {this.state.errorLoading ? (
                    <p className="register-error">{this.state.error}</p>
                  ) : (
                    <span></span>
                  )}
                </form>
                <p className="bottom-text">
                  Already have an account?
                  <span> </span>
                  <Link to="/login">
                    <span>Login</span>
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
  {}
)(Register);
