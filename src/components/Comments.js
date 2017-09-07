import React, { Component } from 'react';
 import Comment from './Comment';



 class Comments extends Component {
   state = {
     comments: []
   }
   componentWillMount(){
     this.setState({comments: this.props.comments});
   }

   componentWillReceiveProps(newVal){
     this.setState({comments: newVal.comments})
   }

updateComment(deletedcomment){
  const comments = this.state.comments.filter((c) => c.id !== deletedcomment.id);
  this.setState({comments})
}


   render() {
    return (
      <div className="Comments">
        {
          this.props.comments.map((comt , key) =>
            <Comment key={key}
            comment= {comt}
            updateComment={this.updateComment.bind(this)}
             />
          )
        }
      </div>
    )
  }
}

export default Comments;
