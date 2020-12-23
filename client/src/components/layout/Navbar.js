import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthentication, loading }, logout }) => {
  const authlinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          {" "}
          <i className="fas fa-user"></i> {"  "}
          <span className="hide-sm"> Dashboard </span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to="/login">
          <i className="fas fa-sign-out-alt"></i> {"  "}
          <span className="hide-sm"> Logout </span>
        </Link>
      </li>
    </ul>
  );
  const guestlinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthentication ? authlinks : guestlinks}</Fragment>
      )}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
