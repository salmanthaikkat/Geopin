import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import ReactGA from "react-ga";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import UserHome from "./components/user-home/UserHome";
import landingPage from "./components/landing-page/landingPage";
import searchResult from "./components/search-result/searchResult";
import checkinResult from "./components/checkin-result/checkinResult";
import userProfile from "./components/user-profile/user-profile";
import visitorProfile from "./components/visitor-profile/visitor-profile";

ReactGA.initialize("UA-150088405-2");
ReactGA.pageview(window.location.pathname + window.location.search);
class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={landingPage} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={UserHome} />
          <Route path="/search" component={searchResult} />
          <Route path="/checkin" component={checkinResult} />
          <Route path="/user-profile" component={userProfile} />
          <Route path="/visitor-profile/:id" component={visitorProfile} />
          <Route component={landingPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
