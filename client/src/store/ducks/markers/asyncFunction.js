import {initMarkersAC} from './actionCreators'

export const fetchInitMarkers = () => {
    return async (dispatch) => {
      try {
        let response = await fetch("/marks");
        let result = await response.json();
        let { data } = result;
        if (result.status === "success") {
          dispatch(initMarkersAC(data));
        }
      } catch (err) {
        console.log(err);
      }
    };
  };