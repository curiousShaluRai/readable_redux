import React, { Component } from 'react';
import Post from './Post'
import AddPostForm from './AddPostForm';


export default class Posts extends Component {

  state = {
    posts: []
  }

  updatePosts(deleteId){
    const posts = this.state.posts.filter((p) => p.id !== deleteId);
      this.setState({ posts});
  }

  componentWillMount(){
    this.setState({ posts: this.props.posts});
  }

  componentWillReceiveProps(newVal){
    this.setState({posts: newVal.posts})
  }

render(){

  return (
     <div className = "Posts" >
     <AddPostForm addPost={this.props.addPost.bind(this)} />
              {
            this.state.posts.map((p) =>
            <Post key={p.timestamp}
                    updatePosts={this.updatePosts.bind(this)}
                    post={p} />
            )
           }
  </div>


  )
}


}
