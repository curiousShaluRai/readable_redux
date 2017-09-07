import React, { Component } from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';

export default class AddCommentForm extends Component {
  state = {
    author: '',
    body: ''
  }

  handleSubmit(e) {
    e.preventDefault();

    const author = this.state.author;
    const body = this.state.body;
    const parentId = this.props.parentId;

    ReadableAPI
    .addComment(parentId, body, author)
    .then((comt) => this.props.addComment(comt));
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
