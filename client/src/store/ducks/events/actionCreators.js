import {
GET_FIELD_EVENTS, 
  GET_DAY_EVENTS, 
  GET_AVAIL_TIMES, 
  ADD_EVENT,JOIN_EVENT,
  LEAVE_EVENT
} from './contracts/actiontypes'

export const getFieldEventsAC = (payload) => {
    return {
      type: GET_FIELD_EVENTS,
      payload
    }
  };
  
  export const getDayEventsAC = (payload) => {
    return {
      type: GET_DAY_EVENTS,
      payload
    }
  };
  
  export const getDayAvailTimesAC = () => {
    return {
      type: GET_AVAIL_TIMES,
    }
  };
  
  export const addEventAC = (payload) => {
    return {
      type: ADD_EVENT,
      payload
    }
  };
  
  export const joinEventAC = (payload) => {
    return {
      type:JOIN_EVENT,
      payload
    }
  }
  
  export const leaveEventAC = (payload) => {
    return {
      type:LEAVE_EVENT,
      payload
    }
  }
  