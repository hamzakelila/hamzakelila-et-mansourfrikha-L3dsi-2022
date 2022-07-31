import axios from "axios";
import {
  PROBLEMES_CREATE_FAIL,
  PROBLEMES_CREATE_REQUEST,
  PROBLEMES_CREATE_SUCCESS,
  PROBLEMES_DELETE_FAIL,
  PROBLEMES_DELETE_REQUEST,
  PROBLEMES_DELETE_SUCCESS,
  PROBLEMES_LIST_FAIL,
  PROBLEMES_LIST_REQUEST,
  PROBLEMES_LIST_SUCCESS,
  PROBLEMES_UPDATE_FAIL,
  PROBLEMES_UPDATE_REQUEST,
  PROBLEMES_UPDATE_SUCCESS,
} from "../constants/problemesConstants";

export const listProRequest = () => {
  return { type: PROBLEMES_LIST_REQUEST };
};
export const listProSuccess = (data) => {
  return {
    type: PROBLEMES_LIST_SUCCESS,
    payload: data,
  };
};
export const listFailPro = (error) => {
  const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  console.log(message);
  return {
    type: PROBLEMES_LIST_FAIL,
    payload: message,
  };
};
// export const listProblemes = () => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: PROBLEMES_LIST_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: Bearer ${userInfo.token},
//       },
//     };

//     const { data } = await axios.get(/api/problemes, config);

//     dispatch({
//       type: PROBLEMES_LIST_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({
//       type: PROBLEMES_LIST_FAIL,
//       payload: message,
//     });
//   }
// };
export const createProblemeAction = () => {
  return { type: PROBLEMES_CREATE_REQUEST };
};

export const createProblemeSuccess = (data) => {
  return {
    type: PROBLEMES_CREATE_SUCCESS,
    payload: data,
  };
};

export const createProblemeFail = (message) => {
  return {
    type: PROBLEMES_CREATE_FAIL,
    payload: message,
  };
};

export const updateProblemeAction =
  (id, updatedProbleme) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PROBLEMES_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        "http://localhost:5000" + `/api/problemes/${id}`,
        updatedProbleme,
        config
      );

      dispatch({
        type: PROBLEMES_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PROBLEMES_UPDATE_FAIL,
        payload: message,
      });
    }
  };
export const deleteProblemeAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROBLEMES_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization:` Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      "http://localhost:5000" + `/api/problemes/${id}`,
      config
    );

    dispatch({
      type: PROBLEMES_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PROBLEMES_DELETE_FAIL,
      payload: message,
    });
  }
};