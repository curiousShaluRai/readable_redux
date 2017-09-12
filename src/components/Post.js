import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditPostForm from './EditPostForm'
import { asyncPostVote, asyncDeletePost,  getPostCommentsNum,
  updatePostCommentsNumMap } from '../actions'
import { connect } from 'react-redux'
import { FaCaretUp, FaCaretDown, FaClose } from 'react-icons/lib/fa';
import moment from 'moment';


class Post extends Component{

  componentWillMount = () => {
      const postId = this.props.postId;
      this.props.getPostCommentsNum(postId).then(function(num) {
        this.props.updatePostCommentsNumMap(postId, num.num)
      }.bind(this));
    }

//The data could have changed between the initial render and the two subsequent updates ...
// React has no way of knowing that the data didn’t change.
//Therefore, React needs to call componentWillReceiveProps, because the component needs to be notified of the new props

// componentWillReceiveProps(newVal){
//   this.setState({post: newVal.post})
// }

deletePost(){

  const postId = this.props.postId;
  this.props.deletePost(postId);

}

deletePost = this.deletePost.bind(this);



voteDetermine(voteType) {

     const postId = this.props.postId;
     this.props.postVote(postId, voteType)
       }


  render(){
    const postId =  this.props.postId;
    const posts = this.props.posts.filter(p => p.id === postId && p.deleted !== true);
    console.log(posts);
    const post = posts.length > 0 ? posts[0] : {};
     const time = moment(`${post.timestamp}`, "x").fromNow();
      const numberOfComments = this.props.postCommentsNumMap[postId];
    return(
  <div className = {`Post ${this.props.detail ? "detail" : ""}`}>
  <div className="vote-component">
      <FaCaretUp className="voteButton"  onClick={this.voteDetermine.bind(this,"upVote")} />
        <strong>{post.voteScore}</strong>
      <FaCaretDown className="voteButton"  onClick={this.voteDetermine.bind(this,"downVote")} />
  </div>
    <div className="post-info">
      <Link to={`/${post.category}/${post.id}`} className="title-link">{ post.title }</Link>
          <p>
        { `submitted ${time} from ${post.author} to ` }
  <Link className="category-link" to={`/${post.category}`}>{ post.category }</Link>
                </p>
    <div className="modify-buttons">
    <FaClose className="delete-button" onClick={this.deletePost} />

    <EditPostForm
    post = { post}
   />
      <span>{ `${numberOfComments} comments`}</span>
 </div>
</div>
{ this.props.detail &&
               <div className="post-body">
                { post.body }
              </div>
            }
</div>

    )
  }
}

function mapStateToProps(state){
  return {
      posts: state.posts,
       postCommentsNumMap: state.postCommentsNumMap
  }
}

function mapDispatchToProps(dispatch){
  return{
    postVote: (id, vote) => dispatch(asyncPostVote(id,vote)),
    deletePost: (id) => dispatch(asyncDeletePost(id)),
    getPostCommentsNum: (id) => dispatch(getPostCommentsNum(id)),
   updatePostCommentsNumMap: (id, numberOfComments) =>
     dispatch(updatePostCommentsNumMap(id, numberOfComments))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
