import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';

//Reducers
import LoginReducer from './reducers/LoginReducer';
import GetTopicReducer from './reducers/GetTopicReducer';

const reducer = combineReducers({
  LoginReducer,
  GetTopicReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;