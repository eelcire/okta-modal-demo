import React from "react";
import Cover from "../components/Cover";
import Banner from "../components/Banner";
import Services from "../components/Services";
import FeaturedRooms from "../components/FeaturedRooms";

const Home = (props) => {
  return (
    <React.Fragment>
      <Cover>
        {!props.state.authenticated ? (
          <Banner title="Login for Info!" subtitle="Click Login Above" />
        ) : (
          <Banner title="User Info!">
            <p>Access Token: {props.state.accessToken}</p>
            <p>ID Token: {props.state.idToken}</p>
          </Banner>
        )}
      </Cover>
      <Services />
      <FeaturedRooms />
    </React.Fragment>
  );
};

export default Home;
