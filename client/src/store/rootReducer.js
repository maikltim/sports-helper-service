import { combineReducers } from 'redux';

import usersReducer from './ducks/user/usersReducer';
import mapReducer from './ducks/markers/mapReducer';
import fieldReducer from './ducks/fields/fieldReducer'
import dateReducer from './ducks/date/dateReducer';
import requestReducer from './ducks/request/requestReducer'
import eventsReducer from './ducks/events/eventsReducer';

const rootReducer = combineReducers({
  users: usersReducer,
  map: mapReducer,
  field: fieldReducer,
  date: dateReducer,
  events: eventsReducer,
  requests: requestReducer,
});

export default rootReducer;
