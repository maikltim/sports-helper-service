import { INIT_MARKERS, ADD_MARKER } from './contracts/actionTypes';

const initialState = {
  markers: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_MARKERS:
      return { ...state, markers: action.payload };

    case ADD_MARKER:
      return 321;

    default:
      return { ...state };
  }
};

export default reducer;
