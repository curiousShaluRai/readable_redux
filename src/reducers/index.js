import { combineReducers } from 'redux';
import {
   RECEIVE_POSTS,
   RECEIVE_CATEGORIES,
   RECEIVE_POST,
   RECEIVE_POST_COMMENTS
  } from '../actions';

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

function post(state = [], action){
  switch (action.type) {
    case RECEIVE_POST:
      return [
        ...action.post
      ]
    default:
      return state;
  }
}

function comments( state = [], action){
  switch(action.type){
    case RECEIVE_POST_COMMENTS:
    return [
      ...action.comments
    ]

    default :
    return state;

  }
}


function categories(state = [], action){

  switch (action.type) {
    case RECEIVE_CATEGORIES:
    return[
      ...action.categories
    ]

    default:
    return state;

  }
}

// An object whose values correspond to different reducing functions that need to be combined into one.
export default combineReducers({
  posts,
  post,
  comments,
  categories
})
