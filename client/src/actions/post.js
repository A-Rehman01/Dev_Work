import axios from "axios";
import { setAlert } from "./alert";
import {
  POST_ERROR,
  GET_POSTS,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./types";

//GET posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//GET post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//GET likes
export const addLike = (postID) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postID}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postID, likes: res.data },
    });

    dispatch(getPosts());
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, "danger"));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Reomve likes
export const removeLike = (postID) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postID}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postID, likes: res.data },
    });
    dispatch(getPosts());
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, "danger"));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete post
export const deletePost = (postID) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postID}`);
    dispatch({
      type: DELETE_POST,
      payload: { postID },
    });
    dispatch(getPosts());
    dispatch(setAlert("Post Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//ADD post
export const addPost = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/posts", formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(getPosts());
    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//ADD comment
export const addComment = (postID, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `/api/posts/comment/${postID}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete comment
export const removeComment = (postID, commentID) => async (dispatch) => {
  console.log(postID, commentID);

  try {
    await axios.delete(`/api/posts/comment/${postID}/${commentID}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentID,
    });
    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
