import {initRequestAC, addRequestAC, deleteRequestAC} from './actionCreators'

export const fetchInitRequests = () => {
    return async (dispatch) => {
      try {
        let response = await fetch("/requests");
        let result = await response.json();
        let { data } = result
        if (result.status === "success") {
          dispatch(initRequestAC(data));
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  
  export const fetchAddRequests = ({ lat, lng, fieldTitle, fieldAddress, fieldContent }) => {
    return async (dispatch) => {
      try {
        let response = await fetch("/requests", {
          method: "POST",
          headers: {
            "Content-type": "Application/json",
          },
          body: JSON.stringify({
            lat,
            lng,
            fieldTitle,
            fieldContent,
            fieldAddress
          }),
        });
        let result = await response.json();
        let { data } = result;
        if (result.status === "success") {
          dispatch(addRequestAC(data));
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  
  export const fetchDeleteRequests = (id) => {
    return async (dispatch) => {
      try {
        let response = await fetch("/requests", {
          method: "DELETE",
          headers: {
            "Content-type": "Application/json",
          },
          body: JSON.stringify({ id }),
        });
        let result = await response.json();
        let { data } = result
        if (result.status === "success") {
          dispatch(deleteRequestAC(data));
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  
  export const fetchAcceptRequests = (id, title, content, address, lat, lng, info) => {
    return async (dispatch) => {
      try {
        let response = await fetch('/field', {
          method: "POST",
          headers: {
            "Content-type": "Application/json",
          },
          body: JSON.stringify({
            title,
            content,
            address
          }),
        });
        let result = await response.json();
        let { data } = result
        if (result.status === "success") {
          let response = await fetch('/marks', {
            method: "POST",
            headers: {
              "Content-type": "Application/json",
            },
            body: JSON.stringify({
              lat,
              lng,
              info,
              field: data._id,
            }),
          });
          let result = await response.json();
          if (result.status === "success") {
            let response = await fetch("/requests", {
              method: "DELETE",
              headers: {
                "Content-type": "Application/json",
              },
              body: JSON.stringify({ id }),
            });
            let result = await response.json();
            let { data } = result
            if (result.status === "success") {
              dispatch(deleteRequestAC(data));
            }
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  