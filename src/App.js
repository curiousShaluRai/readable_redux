import React, { Component } from 'react';
import  Posts from './Posts';
import Filter from './Filter'
import * as ReadableAPI from './utils/ReadableAPI'


class App extends Component {

  state = {
    posts: []
  }

  componentWillMount = () => {
    ReadableAPI.getAllPosts().then((posts) => this.setState({posts}))
  }


  render() {
    return (


    <div className="App">
       <Posts posts = {this.state.posts}/>
       <Filter/>
   </div>

    );
  }
}

export default App;
