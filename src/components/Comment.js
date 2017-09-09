import React, { Component } from 'react';
import EditCommentForm from './EditCommentForm'
import * as ReadableAPI from '../utils/ReadableAPI';
import { asyncCommentVote } from '../actions';
import { connect } from 'react-redux'


 class Comment extends Component {

  state = {
    comment: {}
  }
///  get the comments
componentWillMount(){
  this.setState({comment: this.state.comment})
}

// get comments , when props changed
componentWillReceiveProps(newVal){
  this.setState({comment: newVal.comment})
}

// vote for comments
voteDetermine(events){
  const voteType = events.target.value;
  const commentId = this.props.comment.id;
  this.props.commentVote(commentId, voteType)
  }

 voteDetermine = this.voteDetermine.bind(this);

deleteComment(){
  const commentId = this.state.comment.id;
  ReadableAPI
  .deleteComment(commentId)
  .then((comment) => this.props.updateComment(comment))
}

editComment(editedComment){
  this.setState({comment:editedComment});
}


  render() {
    const comment = this.state.comment;

      return (
          <div className="Comment">
          <input type="button" value="upVote" onClick = {this.voteDetermine} />
            <strong>{`voteScore: ${comment.voteScore}`}</strong>
          <input type="button" value="downVote" onClick = {this.voteDetermine} />
            <p>{ comment.title }</p>
            <p>{ comment.body }</p>
            <p>{ comment.author }</p>
            <p>{ comment.timestamp}</p>
            <input type="button" value="DELETE" onClick={this.deleteComment.bind(this)} />
            <EditCommentForm
            comment= {comment}
            editComment= {this.editComment.bind(this)} />
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
   commentVote: (id, vote) =>  dispatch(asyncCommentVote(id, vote))
  }
}

export default connect(
  mapStateToProps,
  mapStateTodispatch
)(Comment)
