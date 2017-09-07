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
   render() {
    return (
      <div className="Comments">
        {
          this.props.comments.map((comt , key) =>
            <Comment key={key} comment= {comt} />
          )
        }
      </div>
    )
  }
}

export default Comments;
