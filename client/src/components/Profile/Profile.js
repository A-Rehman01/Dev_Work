import React, { Fragment, useEffect } from "react";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import { getProfilesbyID } from "../../actions/profile";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile = ({
  getProfilesbyID,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfilesbyID(match.params.id);
  }, [getProfilesbyID, match.params.id]);
  return (
    <Fragment>
      {profile == null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Go To Profiles
          </Link>
          {auth.isAuthentication &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                profile.experience.map((experience, index) => (
                  <ProfileExperience key={index} experience={experience} />
                ))
              ) : (
                <h4>No Experience Credentials</h4>
              )}
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                profile.education.map((education, index) => (
                  <ProfileEducation key={index} education={education} />
                ))
              ) : (
                <h4>No Education Credentials</h4>
              )}
            </div>
          </div>
          {profile.githubusername && (
            <ProfileGithub username={profile.githubusername} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfilesbyID })(Profile);
