import {getFieldEventsAC, addEventAC, joinEventAC, leaveEventAC} from './actionCreators'


export const fetchGetFieldEvents = (payload) => {
    return async (dispatch) => {
      try {
        const response = await fetch(`/field/${payload}/events`);
        const result = await response.json();
        const { data } = result;
        dispatch(getFieldEventsAC(data));
      } catch (err) {
        console.log(err)
      }
    }
  };
  
  export const fetchAddEvent = ({ name, description, time, date, fieldId }) => {
    return async (dispatch) => {
      try {
        let response = await fetch("/events", {
          method: "POST",
          headers: {
            "Content-type": "Application/json",
          },
          body: JSON.stringify({
            title: name,
            content: description,
            start: time,
            date,
            fieldId
          }),
        });
        let result = await response.json();
        let { data } = result;
        console.log(data)
        if (result.status === "success") {
          dispatch(addEventAC(data));
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  
  export const fetchJoinEvent = (eventId, UserId) => {
    return async (dispatch) => {
      try {
        let response = await fetch(`/events/${eventId}`, {
          method: "PATCH",
          headers: {
            "Content-type": "Application/json",
          },
          body: JSON.stringify({
            id: UserId,
          }),
        });
        let result = await response.json();
        let { data } = result;
        if (result.status === "success") {
          dispatch(joinEventAC(data));
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  
  export const fetchLeaveEvent = (eventId, UserId) => {
    return async (dispatch) => {
      try {
        let response = await fetch(`/events/${eventId}`, {
          method: "PUT",
          headers: {
            "Content-type": "Application/json",
          },
          body: JSON.stringify({
            id: UserId,
          }),
        });
        let result = await response.json();
        let { data } = result;
        if (result.status === "success") {
          dispatch(leaveEventAC(data));
        }
      } catch (err) {
        console.log(err)
      }
    }
  }