
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Post extends Component{

  render(){
    const post =  this.props.post;
    return(
  <div className = "Post" >
    <strong>{`voteScore: ${post.voteScore}`}</strong>
     <Link to={`/${post.category}/${post.id}`}>{ post.title }</Link>
    <p>{ post.body }</p>
    <p>{ post.author }</p>
    <p>{ post.category}</p>
    <p>{ post.timestamp}</p>
 </div>


    )
  }
}

export  default Post;
