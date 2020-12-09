import React from "react";
import Moment from "react-moment";

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, to, from, description },
}) => {
  return (
    <div>
      <h3 className="text-dark" style={{ textTransform: "capitalize" }}>
        {school}
      </h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
        {!to ? "Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p style={{ textTransform: "capitalize" }}>
        <strong>Degree: </strong> {degree}
      </p>
      <p style={{ textTransform: "capitalize" }}>
        <strong>Field Of Study: </strong> {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </div>
  );
};
export default ProfileEducation;
