const OKTA_TESTING_DISABLEHTTPSCHECK =
  process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;

export default {
  oidc: {
    clientId: process.env.REACT_APP_CLIENT_ID,
    issuer: process.env.REACT_APP_ISSUER,
    redirectUri: "http://localhost:3000/implicit/callback",
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  },
};
