import {initFieldsAC} from './actionCreator'

export const fetchInitFields = () => {
    return async (dispatch) => {
      try {
        let response = await fetch("/fields");
        let result = await response.json();
        let { data } = result
        if (result.status === "success") {
          dispatch(initFieldsAC(data));
        }
      } catch (err) {
        console.log(err)
      }
    }
  }