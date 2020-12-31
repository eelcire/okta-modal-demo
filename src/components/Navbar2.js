import React, { Component } from "react";

import Logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

import OktaModal from "../components/OktaModal";

import { authClient } from "../containers/App";

export default class Navbar extends Component {
  state = { opened: false };

  onLoginClicked = () => {
    this.setState({ opened: !this.state.opened });
  };

  onLoginPopup = () => {
    authClient.loginWithPopup();
  };

  render() {
    return (
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            <Link to="/">
              <img src={Logo} alt="Hotel Booking" />
            </Link>
          </div>

          {!this.props.state.authenticated ? (
            <ul className={"nav-links show-nav"}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/rooms">Rooms</Link>
              </li>
              {/* <li>
                <Link onClick={this.onLoginPopup}>Login</Link>
              </li> */}
              <div>
                <OktaModal
                  id={this.state.opened ? "opened" : "closed"}
                  style={{
                    position: "absolute",
                    height: "573px",
                    top: "58px",
                    right: "180px",
                    border: "none",
                  }}
                  redirectUri={`http://localhost:3000/redirect`}
                />
              </div>
              <li>
                <Link onClick={this.onLoginClicked}>Login</Link>
              </li>
            </ul>
          ) : (
            <ul className={"nav-links show-nav"}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/rooms">Rooms</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link onClick={() => this.props.logout(this.props.state)}>
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}
