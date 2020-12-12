import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "upkit/dist/style.min.css";
import { Provider } from "react-redux";
import store from "./app/store";
import Home from "./pages/Home";
import { listen } from "./app/listener";

import Register from "./pages/Register";
import RegisterSuccess from "./pages/RegisterSuccess";
import Login from "./pages/Login";
import { getCart } from "./api/cart";

function App() {
  React.useEffect(() => {
    listen();
    getCart();
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/register/success" component={RegisterSuccess} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
