import React, { useEffect } from "react";

function LoginCallback({ authClient }) {
  useEffect(() => {
    authClient.token.parseFromUrl().then((res) => {
      console.log(res);
      authClient.tokenManager.add("accessToken", res.tokens.accessToken);
      authClient.tokenManager.add("idToken", res.tokens.idToken);
      window.top.location.reload();
    });
  }, []);
  return (
    <div>
      <img></img>
    </div>
  );
}

export default LoginCallback;
