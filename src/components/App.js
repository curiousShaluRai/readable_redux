import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'
import  Posts from './Posts';
import Filter from './Filter'
import ShowPost from './ShowPost';
import { Route } from 'react-router-dom'



class App extends Component {

  state = {
    posts: [],
    sortkey:'voteScore'
  }


  componentWillMount = () => {
    this.props.fetchPosts();
  }

  componentWillReceiveProps(newVal){
    const postss = newVal.posts;
    const activePost = postss.filter(p => p.deleted === false)
    this.setState({ posts: activePost});
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

function mapStateToProps(state){
  return{
    posts: state.posts
  }
}

function mapDispatchToProps(dispatch){
  return{
    fetchPosts: () => dispatch(fetchPosts())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
