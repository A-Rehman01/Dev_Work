import React from "react";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { company, title, to, from, description },
}) => {
  return (
    <div>
      <h3 className="text-dark" style={{ textTransform: "capitalize" }}>
        {company}
      </h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
        {!to ? "Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p style={{ textTransform: "capitalize" }}>
        <strong>Position: </strong> {title}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </div>
  );
};
export default ProfileExperience;
