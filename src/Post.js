
import React, { Component } from 'react';

class Post extends Component{

  render(){
    const post =  this.props.post;
    return(
  <div className = "Post" >
    <strong>{`voteScore: ${post.voteScore}`}</strong>
    <p>{ post.title }</p>
    <p>{ post.body }</p>
    <p>{ post.author }</p>
    <p>{ post.category}</p>
    <p>{ post.timestamp}</p>
 </div>


    )
  }
}

export  default Post;
