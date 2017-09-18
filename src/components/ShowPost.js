import React, { Component } from 'react';
import NavBar from './NavBar'
import Post from './Post';
import Comments from './Comments';
import AddCommentForm from './AddCommentForm'
import {  fetchPostComments, changeCommentSortKey } from '../actions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

 class ShowPost extends Component {


  componentDidMount(){
    const postId = this.props.match.params.postId;
    this.props.fetchPostComments(postId);
    }


 handleSortChange =(events) =>{
   const sortKey =  events.target.value;
   this.props.changeCommentSortKey(sortKey);
 }

  render() {
    const postId = this.props.match.params.postId;
     const comments = this.props.comments;
     const sortKey = this.props.commentsSortKey;
     const activePosts = this.props.posts.filter(p => p.id === postId && p.deleted !== true);
     if (activePosts.length > 0) {
    return (
      <div>
        <NavBar detail={true} />
        <Post postId={postId} detail={true} />
        <div>
          <AddCommentForm parentId={postId} />
          <div className="comments-content">
            <h3>Comments</h3>
            {
              <label htmlFor="select-comments-sort" className="sort-comments-label">
                <p>Sort By</p>
                <select id="select-comments-sort"
                value={sortKey}
                 onChange={this.handleSortChange.bind(this)} >
                  <option value="voteScore"
                   selected={sortKey === 'voteScore'} >
                    Sort By Vote
                  </option>
                  <option value="timestamp"
                   selected={sortKey === 'timestamp'}>
                    Sort By Time
                  </option>
                </select>
              </label>
            }
            <Comments comments={comments} />
          </div>
        </div>
      </div>
    )
  }
    else {
      return (
      <Redirect to="/"/>

      )
    }

}
}

function mapStateToProps(state){
  return{
    posts: state.posts,
    comments: state.comments,
    commentsSortKey: state.commentsSortKey
  }
}


function mapDispatchToProps(dispatch){
  return{

    fetchPostComments: (id) => dispatch(fetchPostComments(id)),
     changeCommentSortKey: (key) => dispatch(changeCommentSortKey(key))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowPost);
