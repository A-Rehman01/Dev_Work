import axios from "axios";
import { GET_PROFILE, PROFIEL_ERROR } from "./types";
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
