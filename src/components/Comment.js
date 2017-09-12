import React, { Component } from 'react';
import EditCommentForm from './EditCommentForm'
import { asyncCommentVote, asyncDeleteComment } from '../actions';
import moment from 'moment'
import { FaCaretUp, FaCaretDown, FaClose } from 'react-icons/lib/fa'
import { connect } from 'react-redux'


 class Comment extends Component {



// vote for comments
voteDetermine(voteType){
  const commentId = this.props.comment.id;
  this.props.commentVote(commentId, voteType)
  }


deleteComment(){
  const commentId = this.props.comment.id;
   this.props.deleteComment(commentId)

}


  render() {
    const comment = this.props.comment;

const time = moment(`${comment.timestamp}`, "x").fromNow();
      return (

    <div className="Comment">
    <div className="vote-component">
   <FaCaretUp className="voteButton" onClick={this.voteDetermine.bind(this, "upVote")} />
   <strong>{comment.voteScore}</strong>
   <FaCaretDown className="voteButton" onClick={this.voteDetermine.bind(this, "downVote")} />
   </div>
   <div className="comment-info">
   <p className="comment-body">{ comment.body }</p>
   <p>
   { `submitted ${time} from ${comment.author}` }
   </p>
  <div className="modify-buttons">
  <FaClose className="delete-button" onClick={this.deleteComment.bind(this)} />
   <EditCommentForm comment={comment}  />
               </div>
             </div>
           </div>
        )
  }
}


function mapStateToProps(state){
  return{
    comments: state.comments
  }
}

function mapStateTodispatch(dispatch){
  return{
   commentVote: (id, vote) =>  dispatch(asyncCommentVote(id, vote)),
   deleteComment: (id) => dispatch(asyncDeleteComment(id))
  }
}

export default connect(
  mapStateToProps,
  mapStateTodispatch
)(Comment)
