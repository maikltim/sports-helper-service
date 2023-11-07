import {INIT_REQUESTS, ADD_REQUEST, DELETE_REQUEST} from './contracts/actionTypes'

export const initRequestAC = (payload) => {
    return {
      type: INIT_REQUESTS,
      payload
    }
  };
  
  export const addRequestAC = (payload) => {
    return {
      type: ADD_REQUEST,
      payload
    }
  };
  
  export const deleteRequestAC = (payload) => {
    return {
      type: DELETE_REQUEST,
      payload
    }
  };