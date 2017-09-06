import React, { Component } from 'react';


export default class Comment extends Component {
  render() {
    const comment = this.props.comment;

      return (
          <div className="Comment">
          <strong>{`voteScore: ${comment.voteScore}`}</strong>
            <p>{ comment.title }</p>
            <p>{ comment.body }</p>
            <p>{ comment.author }</p>
            <p>{ comment.timestamp}</p>
          </div>
        )

    
  }
}
