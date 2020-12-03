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
    dispatch({
      type: PROFIEL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
