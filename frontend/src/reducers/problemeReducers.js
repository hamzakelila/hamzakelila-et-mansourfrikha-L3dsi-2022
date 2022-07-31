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
const intialState = {
  problemes: [],
  loading: false,
};
export const problemeListReducer = (state = intialState, action) => {
  switch (action.type) {
    case PROBLEMES_LIST_REQUEST:
      return { ...state, loading: true };
    case PROBLEMES_LIST_SUCCESS:
      return { ...state, loading: false, problemes: action.payload };
    case PROBLEMES_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
export const problemeCreateReducer = (state = intialState, action) => {
  switch (action.type) {
    case PROBLEMES_CREATE_REQUEST:
      return { ...state, loading: true };
    case PROBLEMES_CREATE_SUCCESS:
      return { ...state, loading: false, success: true };
    case PROBLEMES_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const problemeUpdateReducer = (state = intialState, action) => {
  switch (action.type) {
    case PROBLEMES_UPDATE_REQUEST:
      return { ...state, loading: true };
    case PROBLEMES_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true };
    case PROBLEMES_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};

export const problemeDeleteReducer = (state = intialState, action) => {
  switch (action.type) {
    case PROBLEMES_DELETE_REQUEST:
      return { ...state, loading: true };
    case PROBLEMES_DELETE_SUCCESS:
      return { ...state, loading: false, success: true };
    case PROBLEMES_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};
