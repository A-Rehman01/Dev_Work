import axios from "axios";
import {
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFIEL_ERROR,
  UPDATE_PROFILE,
} from "./types";
import { setAlert } from "./alert";

//Get Own profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.data.msg);
    const error = err.response.data.msg;
    dispatch(setAlert(error, "danger"));
    dispatch({
      type: PROFIEL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//GET all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get("/api/profile");
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFIEL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// GET profile by userID
export const getProfilesbyID = (userID) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userID}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFIEL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// GET gitrepos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFIEL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create or update Profile
export const createProfile = (body, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/profile", body, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit ? "Profiel Updated" : "Profiel Created", "success"));
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.error;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFIEL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Experience
export const addExperience = (body, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/experience", body, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.error;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFIEL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Education
export const addEducation = (body, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/education", body, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.error;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFIEL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Experience
export const deleteExperence = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    console.log(res.data);
    dispatch(setAlert("Remove Experience", "success"));
  } catch (err) {
    dispatch({
      type: PROFIEL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Remove Education", "success"));
  } catch (err) {
    dispatch({
      type: PROFIEL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Account and Profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you Sure ? This can NOT be undone!!")) {
    try {
      const res = await axios.delete("/api/profile");

      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: DELETE_ACCOUNT,
      });
      dispatch(setAlert("Your Accont has been Removed"));
    } catch (err) {
      dispatch({
        type: PROFIEL_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
