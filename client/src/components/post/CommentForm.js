import React, { useState } from "react";
import { addComment } from "../../actions/post";
import { connect } from "react-redux";

const CommentForm = ({ postID, addComment }) => {
  const [text, setText] = useState();
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comments</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postID, { text });
          setText("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="tect ..."
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default connect(null, { addComment })(CommentForm);
