import { combineReducers } from 'redux';
import {
   RECEIVE_POSTS,
   RECEIVE_CATEGORIES,
   RECEIVE_POST,
   RECEIVE_POST_COMMENTS,
   POST_VOTE,
   COMMENT_VOTE
  } from '../actions';

function posts(state = [], action){
  switch (action.type) {

  case RECEIVE_POSTS:
  return [
    ...action.posts
  ]

  case POST_VOTE:
  return state.map(post =>
    (post.id === action.id)
    ? {...post, voteScore: action.voteScore}
    : post
  )

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

   case COMMENT_VOTE:
   return  state.map(comment =>
       (comment.id === action.id)
       ? {...comment, voteScore: action.voteScore}
       :comment
      )
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
  comments,
  categories
})
