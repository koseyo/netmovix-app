import React from "react";
import { Provider } from "react-redux";
import "./App.scss";
import store from "./redux/store";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Details from "./components/content/movie-details/Details";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => (
  <Provider store={store}>
    <Router>
      <Header />
      <div className="App">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/:id/:name/details" component={Details} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default App;
