import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { removeLike, addLike, deletePost } from "../../actions/post";

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  removeLike,
  addLike,
  deletePost,
  showActions,
}) => {
  return (
    <Fragment>
      <div className="post bg-white p-1 my-1">
        <div>
          <a href="profile.html">
            <img className="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </a>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
          {showActions && (
            <Fragment>
              <button
                onClick={() => addLike(_id)}
                type="button"
                className="btn btn-light "
              >
                <i className="fas fa-thumbs-up"></i>
                {likes.length > 0 && (
                  <span style={{ margin: "0 7px" }}>{likes.length}</span>
                )}
              </button>
              <button
                onClick={() => removeLike(_id)}
                type="button"
                className="btn btn-light"
              >
                <i className="fas fa-thumbs-down"></i>
              </button>
              <Link to={`/posts/${_id}`} className="btn btn-primary">
                Discussion
                {comments.length > 0 && (
                  <span className="comment-count" style={{ margin: "0 7px" }}>
                    {comments.length}
                  </span>
                )}
              </Link>
              {!auth.loading && user === auth.user._id && (
                <button
                  onClick={() => deletePost(_id)}
                  type="button"
                  className="btn btn-danger"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </Fragment>
          )}
        </div>{" "}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
