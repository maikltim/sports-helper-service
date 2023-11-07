import { SET_DATE } from './contracts/actionTypes';

const initialState = {
  date: `${new Date().getDate()}.${Number(new Date().getMonth()) + 1}.${new Date().getFullYear()}`,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATE:
      return { ...state, date: action.payload };

    default:
      return { ...state };
  }
};

export default reducer;
