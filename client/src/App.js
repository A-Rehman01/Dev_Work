import "./App.css";
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Profiles from "./components/Profiles/Profiles";
import Profile from "./components/Profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

//CreateProfile
import CreateProfile from "./components/Profiles-forms/CreateProfile";
import EditProfile from "./components/Profiles-forms/EditProfile";
import AddEducation from "./components/Profiles-forms/AddEducation";
import AddExperience from "./components/Profiles-forms/AddExperience";

// PrivateRoute
import PrivateRoute from "./components/routing/PrivateRoute";

//layout
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
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
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateProfile}
          />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute
            exact
            path="/add-experience"
            component={AddExperience}
          />
          <PrivateRoute exact path="/add-education" component={AddEducation} />
          <PrivateRoute exact path="/posts" component={Posts} />
          <PrivateRoute exact path="/posts/:id" component={Post} />
        </Switch>
      </section>
    </Fragment>
  </Router>
);

export default App;
