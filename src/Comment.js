import React, { Component } from 'react';
import * as ReadableAPI from './utils/ReadableAPI';


export default class Comment extends Component {

  state = {
    comment: {}
  }

componentWillMount(){
  this.setState({comment: this.state.comment})
}

componentWillReceiveProps(newVal){
  this.setState({comment: newVal.comment})
}

voteDetermine(events){
  const voteType = events.target.value;
  const commentId = this.props.comment.id;
  ReadableAPI
  .commentVote(commentId, voteType)
  .then((comment) => this.setState({comment}) )
}

 voteDetermine = this.voteDetermine.bind(this);

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
          </div>
        )


  }
}
