import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfiles } from "../../actions/profile";
import ProfilesItem from "./ProfilesItem";
const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  console.log(loading);
  if (loading) {
    return <Spinner />;
  }
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i>
        {"  "}
        Browse and Connect with Developer
      </p>
      <div className="profiles">
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <ProfilesItem key={profile._id} profile={profile} />
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfiles })(Profiles);
