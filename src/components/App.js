import React, { Component } from 'react';
import  Posts from './Posts';
import Filter from './Filter'
import ShowPost from './ShowPost';
import { Route } from 'react-router-dom'
import * as ReadableAPI from '../utils/ReadableAPI'


class App extends Component {

  state = {
    posts: [],
    sortkey:''
  }


  componentWillMount = () => {
    ReadableAPI
    .getAllPosts()
    .then((posts) => {
      const currentPosts = posts.filter(p => p.deleted === false)
      this.setState({posts: currentPosts});
      this.sortPosts('voteScore')
    } )
  }

  addPost(post){
    const posts = [post, ...this.state.posts];
    this.setState({posts})
  }

  sortPosts(sortKey){
    this.setState({ sortKey  });
    const posts = this.state.posts.sort(this.sortByKey(sortKey).bind(this));
    this.setState({ posts});
  }

  sortByKey(sortKey){
    return function(a,b){
      return a[sortKey]< b[sortKey];
    }
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
                  <Filter sortPosts = {this.sortPosts.bind(this)} 
                  {...props}/>
                </div>
              )}
            />

          <Route path="/:category/:postId" component={ShowPost} />



          </div>
    );
  }
}

export default App;
