import React from "react";

const Cover = (props) => {
  const { coverClass, children } = props;
  return <header className={coverClass}>{children}</header>;
};

export default Cover;

Cover.defaultProps = {
  coverClass: "defaultHero",
};
