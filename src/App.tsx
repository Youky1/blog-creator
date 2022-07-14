import React from "react";
import { HashRouter as Router, useRoutes } from "react-router-dom";
import "antd/dist/antd.css";
import { Provider } from "react-redux";

import store from "./redux";
import routes from "./routes";

function Routes() {
  return useRoutes(routes);
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
