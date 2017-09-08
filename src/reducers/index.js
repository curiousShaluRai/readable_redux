import { combineReducers } from 'redux';
import { RECEIVE_POSTS } from '../actions';

function posts(state = [], action){
  switch (action.type) {

  case RECEIVE_POSTS:
  return [
    ...action.posts
  ]

    default:
    return state;

  }

}
// An object whose values correspond to different reducing functions that need to be combined into one.
export default combineReducers({
  posts
})
