import {SET_DATE} from './contracts/actionTypes'


export const setDateAC = (payload) => {
    return {
      type: SET_DATE,
      payload
    }
  };
  