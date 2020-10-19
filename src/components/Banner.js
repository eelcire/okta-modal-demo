import React from "react";

const Banner = (props) => {
  const { subtitle, title, children } = props;
  return (
    <div className="banner">
      <h1>{title}</h1>
      <div></div>
      <p>{subtitle}</p>
      {children}
    </div>
  );
};

export default Banner;
