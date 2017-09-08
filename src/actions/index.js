import * as ReadableAPI from '../utils/ReadableAPI'

//  create an actions
//Actions are payloads of information that send data from our application to our store.
//They are the only source of information for the store. we send them to the store using store.dispatch().


export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS';


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

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
})

export const fetchPost = (id) => dispatch => (
  ReadableAPI
  .getPost(id)
  .then(post => dispatch(receivePost(post)))
)

// get post comments

export const receivePostComments = comments => ({
  type: RECEIVE_POST_COMMENTS,
  comments
})


export const fetchPostComments = (id) =>  dispatch => (
  ReadableAPI
  .getPostComments(id)
  .then( comments => dispatch(receivePostComments(comments)))
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
