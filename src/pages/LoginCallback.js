import React, { useEffect } from "react";
import { authClient } from "../containers/App";

function LoginCallback(props) {
  useEffect(() => {
    console.log(window.location.href);
    // console.log(window.parent.location.href);
    // if (window.parent.location.href === "http://localhost:3000/") {
    // window.parent.location.href = window.location.href;
    // }
    // authClient.token.parseFromUrl().then((res) => {
    //   console.log(res);
    //   authClient.tokenManager.add("accessToken", res.tokens.accessToken);
    //   authClient.tokenManager.add("idToken", res.tokens.idToken);
    //   window.location.assign("http://localhost:3000/home");
    // });
  }, []);
  return <div></div>;
}

export default LoginCallback;
