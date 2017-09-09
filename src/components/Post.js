import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditPostForm from './EditPostForm'
import { asyncPostVote } from '../actions'
import * as ReadableAPI from '../utils/ReadableAPI'
import { connect } from 'react-redux'


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
  ReadableAPI
  .deletePost(postId);
  this.props.updatePosts(postId);

}

editPost(editedPost){
  this.setState({ post : editedPost});
}

voteDetermine(e) {
     const voteType = e.target.value;
     const postId = this.state.post.id;
     this.props.postVote(postId, voteType)
       }
voteDetermine = this.voteDetermine.bind(this);

  render(){
    const post =  this.state.post;
    return(
  <div className = "Post" >
  <input type="button" value="upVote" onClick={this.voteDetermine} />
  <strong>{`voteScore: ${post.voteScore}`}</strong>
  <input type="button" value="downVote" onClick={this.voteDetermine} />


     <Link to={`/${post.category}/${post.id}`}>{ post.title }</Link>
    <p>{ post.body }</p>
    <p>{ post.author }</p>
    <p>{ post.category}</p>
    <p>{ post.timestamp}</p>

    <input
    type = "button"
    value = "DELETE"
    onClick = { this.deletePost.bind(this)}/>

    <EditPostForm
    post = { post}
    editPost = {this.editPost.bind(this)} />
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
    postVote: (id, vote) => dispatch(asyncPostVote(id,vote))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
