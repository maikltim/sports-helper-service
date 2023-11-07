import {INIT_REQUESTS, ADD_REQUEST, DELETE_REQUEST} from "./contracts/actionTypes";

const initialState = {
  requests: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_REQUESTS:
      return { ...state, requests: action.payload };

    case ADD_REQUEST:
      return {
        ...state,
        requests: [...state.requests, action.payload],
      };

    case DELETE_REQUEST:
      return {
        ...state,
        requests: state.requests.filter((el) => el._id !== action.payload),
      };

    default:
      return { ...state };
  }
};

export default reducer;
