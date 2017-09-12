import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPosts, fetchCategories, setFilterVisibility  } from '../actions'
import NavBar from './NavBar'
import  Posts from './Posts';
import Filter from './Filter'
import ShowPost from './ShowPost';
import { Route, BrowserRouter, Switch } from 'react-router-dom'



class App extends Component {




  componentWillMount = () => {
    this.props.fetchPosts();
    this.props.fetchCategories();
    const width = window.innerWidth;
     if (width < 768) {
      this.props.setFilterVisibility('slide-out');
    }
  }

  toggleFilters() {
     const slideClass = this.props.filtersSlideClass === 'slide-in' ? 'slide-out' : 'slide-in';
     this.props.setFilterVisibility(slideClass);
   }


  render() {
  		      return (
              <BrowserRouter>
              <Switch>

              <Route exact path="/:category?" render={(props) => (
                    <div className="App">

                      <NavBar toggleFilters={this.toggleFilters.bind(this)} />
                     <Posts
                       {...props}
                    />
                      <Filter slideClass={this.props.filtersSlideClass}
                      {...props}/>
                    </div>
                  )}
                />

              <Route exact path="/:category/:postId" component={ShowPost} />

              </Switch>

              </BrowserRouter>






    );
  }
}

function mapStateToProps(state){
  return{
  postSortKey: state.postSortKey,  //reducer
  filtersSlideClass: state.filtersSlideClass
  }
}

function mapDispatchToProps(dispatch){
  return{
    fetchPosts: () => dispatch(fetchPosts()), // action
    fetchCategories: () => dispatch(fetchCategories()),
    setFilterVisibility: (visibility) => dispatch(setFilterVisibility(visibility))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
