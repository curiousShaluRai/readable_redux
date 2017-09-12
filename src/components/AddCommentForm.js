import React, { Component } from 'react';
import { asyncAddComment } from '../actions'
import { connect } from 'react-redux'


 class AddCommentForm extends Component {

  state = {
    author: '',
    body: ''
  }

  handleSubmit(events) {
    events.preventDefault();

    const author = this.state.author;
    const body = this.state.body;
    const parentId = this.props.parentId;

     this.props.addNewComment(parentId, body, author);
  }

  handleInput(events) {
    const newVal = events.target.value;
    const property = events.target.name;
// Object.assign() copies the values (of all enumerable own properties) from one or more source objects to a target object
    let stateObj = Object.assign({}, this.state);
    stateObj[property] = newVal;

    this.setState(stateObj);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" placeholder="comment author" name="author"
               value={this.state.author} onChange={this.handleInput.bind(this)} />
        <input type="text" placeholder="add comment" name="body"
               value={this.state.body} onChange={this.handleInput.bind(this)} />
        <input type="submit" />
      </form>
    )
  }
}

function mapStateToProps(state){
  return {
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch){
  return{
    addNewComment: (parentId, body, author) => dispatch(
      asyncAddComment(parentId, body, author))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCommentForm)
