import React, { Component } from "react";

import Logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
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
              <li>
                {/* <div
                  id="object"
                  style={{
                    position: "absolute",
                    height: "800px",
                    width: "600px",
                    left: "0px",
                  }}
                >
                </div> */}
                <iframe
                  style={{
                    position: "absolute",
                    height: "800px",
                    width: "600px",
                    left: "0px",
                  }}
                  id="object"
                  src="https://iam.mrgres.com/oauth2/ausua89r0fFZxVsAq0h7/v1/authorize?response_type=code&scope=openid&redirect_uri=http://localhost:3000/implicit/callback&state=authn&code_challenge_method=S256&code_challenge=mgm_identity_widget&client_id=mgm_identity_widget"
                ></iframe>
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
