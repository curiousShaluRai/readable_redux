import React, { Component } from 'react';
import { asyncAddComment, changeAddCommentForm } from '../actions'
import { connect } from 'react-redux'


 class AddCommentForm extends Component {

  handleSubmit(events) {
    events.preventDefault();

    const comment = this.props.commentToAdd;
    const parentId = this.props.parentId;
    this.props.addNewComment(parentId, comment);

    const resetComment = { author: '', body: '' };
    this.props.changeCommentToAdd(resetComment);
  }
  handleSubmit = this.handleSubmit.bind(this);

  handleInput(events) {
    const newVal = events.target.value;
    const property = events.target.name;
// Object.assign() copies the values (of all enumerable own properties) from one or more source objects to a target object
    let comment = Object.assign({},  this.props.commentToAdd);
      comment[property] = newVal;
    this.props.changeCommentToAdd(comment);
  }

  handleInput = this.handleInput.bind(this);

  render() {
    const comment = this.props.commentToAdd;
    return (
      <div className="add-comment-form-wrapper">
         <div className="add-comment-form">
           <h3>Add Comment</h3>
           <form onSubmit={this.handleSubmit}>
             <label htmlFor="add-author">
               <p>Author</p>
               <input type="text"
               placeholder="comment author"
                name="author"
                 id="add-author"
                value={comment.author}
                onChange={this.handleInput} />
             </label>
             <label htmlFor="add-body">
               <p>Body</p>
               <input type="text"
               placeholder="add comment"
                name="body"
              id="add-body"
              value={comment.body}
              onChange={this.handleInput} />
             </label>
             <input type="submit" />
           </form>
         </div>
       </div>
    )
  }
}
function mapStateToProps (state) {
  return {
    comments: state.comments,
    commentToAdd: state.commentToAdd
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNewComment: (parentId, comment) =>
      dispatch(asyncAddComment(parentId, comment)),
    changeCommentToAdd: (comment) => dispatch(changeAddCommentForm(comment))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCommentForm);
