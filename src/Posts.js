import React, { Component } from 'react';
import Post from './Post'


export default class Posts extends Component {

render(){
   var posts = [];

  for(var i= 0; i<10;i++){
    posts.push(<Post />)
  }

  return (
 <div className = "Posts" >

 <h1>  Posts </h1>
 { posts}
 

  </div>


  )
}


}
