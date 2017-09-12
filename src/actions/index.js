import * as ReadableAPI from '../utils/ReadableAPI'

//  create an actions
//Actions are payloads of information that send data from our application to our store.
//They are the only source of information for the store. we send them to the store using store.dispatch().


export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS';
export const POST_VOTE = 'POST_VOTE';
export const COMMENT_VOTE = 'COMMENT_VOTE';
export const  DELETE_POST = 'DELETE_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const ADD_POST = 'ADD_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_POST = ' EDIT_POST';
export const EDIT_COMMENT = 'EDIT_COMMENT';

export const CHANGE_ADD_COMMENT_FORM = "CHANGE_ADD_COMMENT_FORM";
export const CHANGE_EDIT_COMMENT_FORM = "CHANGE_EDIT_COMMENT_FORM";
export const CHANGE_ADD_POST_FORM = "CHANGE_ADD_POST_FORM";
export const CHANGE_EDIT_POST_FORM = "CHANGE_EDIT_POST_FORM";

export const TOGGLE_EDIT_COMMENT_MODAL = "TOGGLE_EDIT_COMMENT_MODAL";
export const TOGGLE_EDIT_POST_MODAL = "TOGGLE_EDIT_POST_MODAL";
export const TOGGLE_ADD_POST_MODAL = "TOGGLE_ADD_POST_MODAL";

export const CHANGE_POST_SORT_KEY = "CHANGE_POST_SORT_KEY";
export const CHANGE_COMMENT_SORT_KEY = "CHANGE_COMMENT_SORT_KEY";

export const SET_FILTER_VISIBILITY = "SET_FILTER_VISIBILITY";

export const RECEIVE_POST_COMMENTS_NUM = "RECEIVE_POST_COMMENTS_NUM";
export const UPDATE_POST_COMMENTS_NUM_MAP = "UPDATE_POST_COMMENTS_NUM_MAP";



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


export const postVote = (id, voteScore) => ({
  type: POST_VOTE,
    id,
    voteScore

})

export const asyncPostVote = (id,vote) => dispatch =>(
  ReadableAPI
  .postVote(id, vote)
  .then( post => dispatch(postVote(post.id, post.voteScore) ))
)

export const deletePost = (id) => ({
    type: DELETE_POST,
    id

})

export const asyncDeletePost = (id) => dispatch => (
  ReadableAPI
  .deletePost(id)
  .then( post => dispatch(deletePost(post.id)))
)

// add new post
export const addPosts = (post) =>({
  type:ADD_POST,
  post
}
)

export const asyncAddPost = (post) => dispatch => (
  ReadableAPI
      .addPost(post)
      .then(post => dispatch(addPosts(post)))
);

export const editPosts = (post) =>({
  type: EDIT_POST,
  post
})

  export const asyncEditPost = (post) => dispatch => (
    ReadableAPI
        .editPost(post)
        .then(post => dispatch(editPosts(post)))
  );

  export const receivePostCommentsNum = num => ({
    type: RECEIVE_POST_COMMENTS_NUM,
    num
})

export const getPostCommentsNum = (id) => dispatch => (
  ReadableAPI
      .getPostCommentsNum(id)
      .then(num => dispatch(receivePostCommentsNum(num)))
);

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
});

export const fetchPost = (id) => dispatch => (
  ReadableAPI
      .getPost(id)
      .then(post => dispatch(receivePost(post)))
);

export function changeAddCommentForm(comment) {
  return {
    type: CHANGE_ADD_COMMENT_FORM,
    comment
  }
};

export function changeAddPostForm(post) {
  return {
    type: CHANGE_ADD_POST_FORM,
    post
  }
};

export function changeEditCommentForm(comment) {
  return {
    type: CHANGE_EDIT_COMMENT_FORM,
    comment
  }
};

export function changeEditPostForm(post) {
  return {
    type: CHANGE_EDIT_POST_FORM,
    post
  }
};

export function toggleAddPostModal() {
  return {
     type: TOGGLE_ADD_POST_MODAL
   } };
export function toggleEditPostModal() {
  return {
     type: TOGGLE_EDIT_POST_MODAL
    } };
export function toggleEditCommentModal() {
  return {
    type: TOGGLE_EDIT_COMMENT_MODAL
   } };

export function changePostSortKey(key) {
  return {
    type: CHANGE_POST_SORT_KEY,
    key
  }
}

export function changeCommentSortKey(key) {
  return {
    type: CHANGE_COMMENT_SORT_KEY,
    key
  }
}

export function setFilterVisibility(visibility) {
  return {
    type: SET_FILTER_VISIBILITY,
    visibility
  }
}

export function updatePostCommentsNumMap(postId, numberOfComments) {
  return {
    type: UPDATE_POST_COMMENTS_NUM_MAP,
    postId,
    numberOfComments
  }
}


/// action for comments
  export const editComment = (comment) => ({
    type: EDIT_COMMENT,
    comment
    })

  export const asyncEditComment = (commentId, comment) => dispatch => (
    ReadableAPI
        .editComment(commentId, comment)
        .then(comment => dispatch(editComment(comment)))
  );


export const addComments = (comment) =>({
  type: ADD_COMMENT,
  comment
})

export const asyncAddComment = (parentId, comment) => dispatch => (
  ReadableAPI
      .addComment(parentId, comment)
      .then(comments => dispatch(addComments(comments)))
);

export const deleteComment = (id) => ({
    type: DELETE_COMMENT,
    id
  }
)

export const asyncDeleteComment = (id) => dispatch => (
   ReadableAPI
   .deleteComment(id)
   .then ( comment =>  dispatch(deleteComment(comment.id)))

)

export const commentVote = (id, voteScore) => ({
   type: 'COMMENT_VOTE',
    id,
    voteScore
  }
)

export const asyncCommentVote = (id, vote) => dispatch =>(
  ReadableAPI
  .commentVote(id, vote)
  .then(comment => dispatch(commentVote(comment.id, comment.voteScore)))
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
