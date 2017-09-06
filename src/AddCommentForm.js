import React, { Component } from 'react';

export default class AddCommentForm extends Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="comment author" />
        <input type="text" placeholder="add comment" />
      </form>
    )
  }
}
