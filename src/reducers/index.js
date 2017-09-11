import { combineReducers } from 'redux';
import {
   RECEIVE_POSTS,
   RECEIVE_CATEGORIES,
   RECEIVE_POST_COMMENTS,
   POST_VOTE,
   COMMENT_VOTE,
   DELETE_POST,
   DELETE_COMMENT,
   ADD_POST,
   ADD_COMMENT,
   EDIT_POST,
   EDIT_COMMENT
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


  case DELETE_POST :
    return state.map(post =>
      (post.id === action.id)
        ? {...post, deleted: true}
        : post
      )
  
      case ADD_POST:
      return [
        action.post,
        ...state
      ]

      case EDIT_POST:
      return state.map( post =>
       (post.id === action.id)
       ? {...action.post }
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
      case DELETE_COMMENT:
      return state.filter(comment => (comment.id !== action.id))

     case ADD_COMMENT:
     return [
       action.comment,
       ...state
     ]

   case EDIT_COMMENT:
   return state.map(comment =>
   (comment.id === action.comment.id)
   ?{ ...action.comment}
   : comment
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
