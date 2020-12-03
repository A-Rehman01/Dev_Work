import "./App.css";
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

//layout
import { Landing } from "./components/layout/Landing";
import { Navbar } from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </section>
    </Fragment>
  </Router>
);

export default App;
