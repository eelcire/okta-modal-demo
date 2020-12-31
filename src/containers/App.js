import React, { Component } from "react";
import "../assets/styles/css/index.css";
import { Route, Switch } from "react-router-dom";

import Navbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";
import Home from "../pages/Home";
import Rooms from "../pages/Rooms";
import SingleRoom from "../pages/SingleRoom";
import ErrorPage from "../pages/ErrorPage";
import Profile from "../pages/Profile";

import { OktaAuth } from "@okta/okta-auth-js";
import config from "../config";

import LoginCallback from "../pages/LoginCallback";
import Redirect from "../pages/Redirect";

export const authClient = new OktaAuth(config.oidc);

class App extends Component {
  state = {
    accessToken: "",
    idToken: "",
    authenticated: false,
    claims: undefined,
  };

  componentDidMount() {
    // let storage = localStorage.getItem("okta-token-storage");
    // if (storage === "{}") {
    //   alert("yes");
    // }

    authClient.tokenManager
      .get("accessToken")
      .then((res) => () => {
        if (res) {
          this.setState({ accessToken: res.value });
        }
      })
      .catch((err) => console.log(err));
    authClient.tokenManager
      .get("idToken")
      .then((res) => {
        if (res) {
          authClient.token
            .verify(res)
            .then(() => {
              console.log(res);
              this.setState({
                claims: res.claims,
                idToken: res.value,
                authenticated: true,
              });
            })
            .catch((err) => {
              console.log(err);
              this.setState({
                accessToken: "",
                idToken: "",
                authenticated: false,
                claims: undefined,
              });
            });
        }
      })
      .catch((err) => {
        this.setState({
          accessToken: "",
          idToken: "",
          authenticated: false,
          claims: undefined,
        });
        console.log(err);
      });
  }

  logout(state) {
    state.authenticated = false;
    authClient.signOut();
  }

  render() {
    return (
      <React.Fragment>
        {window.location.href.split("callback")[0] ===
          "http://localhost:3000/implicit/" ||
        window.location.href.split("direct")[0] ===
          "http://localhost:3000/re" ? (
          <>
            <Switch>
              <Route
                path="/implicit/callback"
                render={(props) => (
                  <LoginCallback
                    {...props}
                    authClient={authClient}
                    // postLogoutUri={"http://localhost:3000/no"}
                  />
                )}
              />
              <Route
                path="/redirect"
                render={(props) => (
                  <Redirect {...props} authClient={authClient} />
                )}
              />
            </Switch>
          </>
        ) : (
          <>
            <Navbar />
            <Navbar2 logout={this.logout} state={this.state} />
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Home state={this.state} />}
              />
              <Route
                exact
                path="/profile"
                render={() => <Profile state={this.state} />}
              />
              <Route exact path="/rooms/" component={Rooms} />
              <Route exact path="/rooms/:slug" component={SingleRoom} />
              <Route component={ErrorPage} />
            </Switch>
          </>
        )}
      </React.Fragment>
    );
  }
}

export default App;
