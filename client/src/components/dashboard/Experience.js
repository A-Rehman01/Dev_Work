import React, { Fragment } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteExperence } from "../../actions/profile";

const Experience = ({ experience, deleteExperence }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td className="hide-sm">
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
        {exp.to !== null ? (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        ) : (
          "Now"
        )}
      </td>
      <td>
        <button
          onClick={() => deleteExperence(exp._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    experience.length > 0 && (
      <Fragment>
        <h2 className="my-2">Experience Credentials</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th className="hide-sm">Title</th>
              <th className="hide-sm">Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      </Fragment>
    )
  );
};
export default connect(null, { deleteExperence })(Experience);
