import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';

//Reducers
import LoginReducer from './reducers/LoginReducer';
import TopicReducer from './reducers/TopicReducer';
import HomeReducer from './reducers/HomeReducer';
import DiscussionReducer from './reducers/DiscussionReducer';
import ResponseReducer from './reducers/ResponseReducer';
import ProfileReducer from './reducers/ProfileReducer';
import VerificationReducer from './reducers/VerificationReducer';
import PrivateDiscussionReducer from './reducers/PrivateDiscussionReducer';

const reducer = combineReducers({
  LoginReducer,
  TopicReducer,
  HomeReducer,
  DiscussionReducer,
  ResponseReducer,
  ProfileReducer,
  VerificationReducer,
  PrivateDiscussionReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;