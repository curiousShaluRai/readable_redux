import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditPostForm from './EditPostForm'
import { asyncPostVote, asyncDeletePost } from '../actions'
import { connect } from 'react-redux'
import { FaCaretUp, FaCaretDown, FaClose } from 'react-icons/lib/fa';
import moment from 'moment';


class Post extends Component{

 state = {
   post: {}
 }

 componentWillMount(){
   const post = this.props.post;

   this.setState({ post })
 }

//The data could have changed between the initial render and the two subsequent updates ...
// React has no way of knowing that the data didn’t change.
//Therefore, React needs to call componentWillReceiveProps, because the component needs to be notified of the new props

componentWillReceiveProps(newVal){
  this.setState({post: newVal.post})
}

deletePost(){

  const postId = this.state.post.id;
  this.props.deletePost(postId);

}

editPost(editedPost){
  this.setState({ post : editedPost});
}

voteDetermine(e) {
     const voteType = e.target.getAttribute('data-votes');
     const postId = this.state.post.id;
     this.props.postVote(postId, voteType)
       }
voteDetermine = this.voteDetermine.bind(this);

  render(){
    const post =  this.state.post;
     const time = moment(`${post.timestamp}`, "x").fromNow();
    return(
  <div className = "Post" >
  <div className="vote-component">
      <FaCaretUp className="voteButton" data-votes="upVote" onClick={this.voteDetermine} />
        <strong>{post.voteScore}</strong>
      <FaCaretDown className="voteButton" data-votes="downVote" onClick={this.voteDetermine} />
  </div>
    <div className="post-info">
      <Link to={`/${post.category}/${post.id}`} className="title-link">{ post.title }</Link>
          <p>
        { `submitted ${time} from ${post.author} to ` }
  <Link className="category-link" to={`/${post.category}`}>{ post.category }</Link>
                </p>
    <div className="modify-buttons">
    <FaClose className="delete-button" onClick={this.deletePost.bind(this)} />

    <EditPostForm
    post = { post}
   />
 </div>
</div>
</div>

    )
  }
}

function mapStateToProps(state){
  return {
      posts: state.posts
  }
}

function mapDispatchToProps(dispatch){
  return{
    postVote: (id, vote) => dispatch(asyncPostVote(id,vote)),
    deletePost: (id) => dispatch(asyncDeletePost(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
