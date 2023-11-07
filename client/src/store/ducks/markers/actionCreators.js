import {INIT_MARKERS, ADD_MARKER} from './contracts/actionTypes'

export const initMarkersAC = (payload) => {
    return {
      type: INIT_MARKERS,
      payload
    }
  }
  
  export const addMarkerAC = (payload) => {
    return {
      type: ADD_MARKER,
      payload
    }
  }