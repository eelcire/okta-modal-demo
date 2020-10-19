import React from "react";
import ReactDOM from "react-dom";
import { RoomProvider } from "./store/context";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./containers/App";

ReactDOM.render(
  <RoomProvider>
    <Router>
      <App />
    </Router>
  </RoomProvider>,
  document.getElementById("root")
);
