import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';

//Reducers
import LoginReducer from './reducers/LoginReducer';
import GetTopicReducer from './reducers/GetTopicReducer';
import HomeReducer from './reducers/HomeReducer';

const reducer = combineReducers({
  LoginReducer,
  GetTopicReducer,
  HomeReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;