import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'
import NavBar from './NavBar'
import  Posts from './Posts';
import Filter from './Filter'
import ShowPost from './ShowPost';
import { Route, BrowserRouter, Switch } from 'react-router-dom'



class App extends Component {

  state = {
    posts: [],
    sortkey:'voteScore',
     slideClass: 'slide-in'
  }


  componentWillMount = () => {
    this.props.fetchPosts();
    const width = window.innerWidth;
     if (width < 768) {
      this.setState({ slideClass: 'slide-out' });
    }
  }

  componentWillReceiveProps(newVal){
    const postss = newVal.posts;
    const activePost = postss.filter(p => p.deleted === false)
    this.setState({ posts: activePost});
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

  toggleFilters() {
     const slideClass = this.state.slideClass === 'slide-in' ? 'slide-out' : 'slide-in';
    this.setState({ slideClass });
  }

  render() {
  		      return (
              <BrowserRouter>
              <Switch>

              <Route exact path="/:category?" render={(props) => (
                    <div className="App">

                      <NavBar toggleFilters={this.toggleFilters.bind(this)} />
                     <Posts
                      posts = {this.state.posts}
                     {...props}
                    />
                      <Filter slideClass={this.state.slideClass}
                      sortPosts = {this.sortPosts.bind(this)}
                      {...props}/>
                    </div>
                  )}
                />

              <Route path="/:category/:postId" component={ShowPost} />

              </Switch>

              </BrowserRouter>






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
