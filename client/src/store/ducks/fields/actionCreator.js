import {INIT_FIELDS, GET_FIELD} from './contracts/actionTypes'


export const initFieldsAC = (payload) => {
    return {
      type: INIT_FIELDS,
      payload
    }
  };
  
  export const getFieldAC = (payload) => {
    return {
      type: GET_FIELD,
      payload
    }
  };