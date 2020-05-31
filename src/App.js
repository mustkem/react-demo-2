import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./css/global.css"; // reset css //
import "./css/app.css";

import { Provider } from "react-redux";
import { appStore } from "./store/store";

import Layout from "./components/Shared/Layout";
import About from "./components/About/About";
import Home from "./containers/Home";

function App() {
  return (
    <Provider store={appStore}>
      <Router>
        <div className="App">
          <Layout>
            <Switch>
              <Route path="/">
                <Home />
              </Route>
              <Route path="/about">
                <About />
              </Route>
            </Switch>
          </Layout>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
