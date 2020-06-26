import React from "react";
import { Provider } from "react-redux";
import "./App.scss";
import store from "./redux/store";
import Header from "./components/header/Header";
import Main from "./components/main/Main";

const App = () => (
  <Provider store={store}>
    <Header />
    <div className="App">
      <Main />
    </div>
  </Provider>
);

export default App;
