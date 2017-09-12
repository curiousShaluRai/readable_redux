import React, { Component } from 'react';
import NavBar from './NavBar'
import Post from './Post';
import Comments from './Comments';
import AddCommentForm from './AddCommentForm'
import { Link } from 'react-router-dom';
import { fetchPosts, fetchPostComments } from '../actions'
import { connect } from 'react-redux'


 class ShowPost extends Component {
  state = {
    post: {},
    comments: [],
    sortkey:'voteScore'
  }

  componentWillMount = () => {
    const postId = this.props.match.params.postId;
    this.props.fetchPostComments(postId);
    this.props.fetchPost(postId);
  }

  componentWillReceiveProps = (newVal) => {
    const postId = this.props.match.params.postId;
    const posts = newVal.posts;
    const comments = newVal.comments;
    let post = {}
    posts.forEach(p => {
      if (p.id === postId) {
      post = p;
      }
     });

    this.setState({ post, comments})
  }

 handleSortChange =(events) =>{
   const sortKey =  events.target.value;
   this.sortComments(sortKey);
 }
  sortComments(sortKey){
    this.setState({ sortKey });
    const comments = this.state.comments.sort(this.sortByKey(sortKey).bind(this));
    this.setState({ comments});
  }

  sortByKey(sortKey){
    return function(a,b){
      return a[sortKey]< b[sortKey];
    }
  }



  render() {
    const post = this.state.post
    const comments = this.state.comments
    return (
      <div>
        <NavBar detail={true} />
        <Post post={post} detail={true} />
        <div>
          <AddCommentForm parentId={post.id} />
          <div className="comments-content">
            <h3>Comments</h3>
            {
              <label for="select-comments-sort" className="sort-comments-label">
                <p>Sort By</p>
                <select id="select-comments-sort" value={this.state.sortKey}
                 onChange={this.handleSortChange.bind(this)} >
                  <option value="voteScore" selected={this.state.sortKey === 'voteScore'} >
                    Sort By Vote
                  </option>
                  <option value="timestamp" selected={this.state.sortKey === 'timestamp'}>
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
}

function mapStateToProps(state){
  return{
    posts: state.posts,
    comments: state.comments
  }
}


function mapDispatchToProps(dispatch){
  return{
    fetchPost:(id) => dispatch(fetchPosts(id)),
    fetchPostComments: (id) => dispatch(fetchPostComments(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowPost);
