import React, { Component } from 'react';
import Post from './Post'


export default class Posts extends Component {

render(){

  return (
 <div className = "Posts" >
 {
           this.props.posts.map((p) => <Post key={p.timestamp} post={p} />)
        }
  </div>


  )
}


}
