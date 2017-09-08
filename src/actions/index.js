import * as ReadableAPI from '../utils/ReadableAPI'

//  create an actions
//Actions are payloads of information that send data from our application to our store.
//They are the only source of information for the store. we send them to the store using store.dispatch().


export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

// create actions for post

export const  receivePosts = posts => ({
 type: RECEIVE_POSTS,
 posts
})

// Asynchronous  action creator for post
export const fetchPosts = () => dispatch => (
  ReadableAPI
  .getAllPosts()
  .then(posts => dispatch(receivePosts(posts)))
);


// get all categories
export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch => (
  ReadableAPI
  .getAllCategories()
  .then(categories => dispatch(receiveCategories(categories)))
)
