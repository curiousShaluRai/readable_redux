import React, { Component } from 'react';
import  Posts from './Posts';
import Filter from './Filter'
import ShowPost from './ShowPost';
import { Route } from 'react-router-dom'
import * as ReadableAPI from '../utils/ReadableAPI'


class App extends Component {

  state = {
    posts: []
  }

  componentWillMount = () => {
    ReadableAPI
    .getAllPosts()
    .then((posts) => {
      const currentPosts = posts.filter(p => p.deleted === false)
      this.setState({posts: currentPosts})
    } )
  }

  addPost(post){
    const posts = [post, ...this.state.posts];
    this.setState({posts})
  }

  render() {
  		      return (
        <div>
          <Route exact path="/:category?" render={(props) => (
                <div className="App">
                 <h1> Readable </h1>
                 <Posts
                 addPost={this.addPost.bind(this)}
                 {...props}
                 posts = {this.state.posts}/>
                  <Filter {...props}/>
                </div>
              )}
            />

          <Route path="/:category/:postId" component={ShowPost} />



          </div>
    );
  }
}

export default App;
