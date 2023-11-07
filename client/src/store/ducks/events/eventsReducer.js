import { GET_FIELD_EVENTS, GET_DAY_EVENTS, GET_AVAIL_TIMES, ADD_EVENT, JOIN_EVENT,LEAVE_EVENT } from './contracts/actiontypes';

const initialState = {
  currentFieldEvents: [],
  currentDayEvents: [],
  currentDayAllTimes: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
  currentDayStartTimes: [],
  currentDayAvailTimes: [],
  eventsData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FIELD_EVENTS:
      return { ...state, currentFieldEvents: action.payload }

    case GET_DAY_EVENTS:
      return {
        ...state, currentDayEvents: state.currentFieldEvents.filter(el => el.date === action.payload),
        currentDayStartTimes: state.currentFieldEvents.filter(el => el.date === action.payload).map(el => el.start),
        eventsData: state.currentFieldEvents.filter(el => el.date === action.payload).map(el => { return { title: `${el.title}\n${el.start}`, cardTitle: el.title, cardText: el.content, cardDetailedText: el.start, id: el._id, party:el.participants} })
        .sort(function (a, b) {
          if (a.cardDetailedText > b.cardDetailedText) {
            return 1
          }
          if (a.cardDetailedText < b.cardDetailedText) {
            return -1
          }
        }),
      };

    case GET_AVAIL_TIMES:
      return { ...state, currentDayAvailTimes: state.currentDayAllTimes.filter((el) => !state.currentDayStartTimes.includes(el)) }
    case ADD_EVENT:
      return { ...state, currentFieldEvents: [...state.currentFieldEvents, action.payload] };
    case JOIN_EVENT:
      return {...state, eventsData: state.eventsData.map(el => el.id == action.payload._id ? { title: `${action.payload.title}\n${action.payload.start}`, cardTitle: action.payload.title, cardText: action.payload.content, cardDetailedText: action.payload.start, id: action.payload._id, party:action.payload.participants} : el)}
    case LEAVE_EVENT:
      return {...state, eventsData: state.eventsData.map(el => el.id == action.payload._id ? { title: `${action.payload.title}\n${action.payload.start}`, cardTitle: action.payload.title, cardText: action.payload.content, cardDetailedText: action.payload.start, id: action.payload._id, party:action.payload.participants} : el)}
    default:
      return { ...state };
  }
};

export default reducer;
