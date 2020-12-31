import React, { useEffect } from "react";

function Redirect({ authClient }) {
  useEffect(() => {
    authClient.token.getWithRedirect();
  }, []);
  return <div></div>;
}

export default Redirect;
