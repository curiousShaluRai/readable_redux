import React, { Component } from 'react';
import Post from './Post';
import Comments from './Comments';
import AddCommentForm from './AddCommentForm'
import * as ReadableAPI from '../utils/ReadableAPI';
import { Link } from 'react-router-dom';


export default class ShowPost extends Component {
  state = {
    post: {},
    comments: []
  }

  componentWillMount = () => {
    const postId = this.props.match.params.postId;

    ReadableAPI.getPost(postId)
             .then((post) => this.setState({post}))

    ReadableAPI.getPostComments(postId)
               .then((comments) => this.setState({comments}))
  }

  addComment(comment) {
     const comments = [comment, ...this.state.comments];
    this.setState({comments})
  }

  render() {
    const post = this.state.post
    const comments = this.state.comments
    return (
      <div>
        <Link to="/">Back Home</Link>
        <Post post={post} />
        <AddCommentForm addComment={this.addComment.bind(this)}
                           parentId={post.id} />
        <Comments comments={comments} />
      </div>
    )
  }
}
