import React, { Component } from 'react';
import  Posts from './Posts';
import Filter from './Filter'
import ShowPost from './ShowPost';
import AddPostForm from './AddPostForm';
import { Route } from 'react-router-dom'
import * as ReadableAPI from './utils/ReadableAPI'


class App extends Component {

  state = {
    posts: []
  }

  componentWillMount = () => {
    ReadableAPI
    .getAllPosts()
    .then((posts) => this.setState({posts}))
  }

  render() {
  		      return (
        <div>
          <Route exact path="/" render={() => (
                <div className="App">
                 <h1> Readable </h1>
                 <Posts posts={this.state.posts}/>
                  <Filter />
                </div>
              )}
            />

          <Route path="/:category/:postId" component={ShowPost} />

      <div className = "footer">
          <AddPostForm />
          </div>

          </div>
    );
  }
}

export default App;
