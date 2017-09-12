import React, { Component } from 'react';
import Post from './Post'
import { connect } from 'react-redux'



 class Posts extends Component {


render(){

  const category = this.props.match.params.category || '';
   const sortByKey = (sortKey) => (a, b) => a[sortKey] < b[sortKey];

  return (
     <div className = "Posts" >

              {
            this.props.posts.filter(
              post => post.deleted !== true && (category === '' || post.category === category))
              .sort(sortByKey(this.props.postSortKey))
               .map( (p, key ) =>
                  <Post  key = {key}  postId = {p.id}    />
            )
           }
  </div>


  )
}
}

function mapStateToProps (state) {
  return {
    posts: state.posts,
    postSortKey: state.postSortKey
  }
}

export default connect(
  mapStateToProps
)(Posts);
