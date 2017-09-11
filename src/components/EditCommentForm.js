import React, { Component } from 'react';
import Modal from 'react-modal';
import  { asyncEditComment } from '../actions'
import { connect } from 'react-redux';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class EditCommentForm extends Component {

  state = {
      modalIsOpen: false,
      author: '',
      body: ''
    }

     openModal = this.openModal.bind(this);
     afterOpenModal = this.afterOpenModal.bind(this);
     closeModal = this.closeModal.bind(this);


  componentWillMount() {
    const comment = this.props.comment;
    this.setState({
      author: comment.author,
       body: comment.body })
  }

  handleSubmit(e) {
    e.preventDefault();

    const author = this.state.author;
    const body = this.state.body;
    const commentId = this.props.comment.id;
    this.props.editComment(commentId, author, body)
    .then(this.closeModal());

  }
 handleSubmit = this.handleSubmit.bind(this);

  handleInput(e) {
    const newVal = e.target.value;
    const property = e.target.name;

    let stateObj = Object.assign({}, this.state);
    stateObj[property] = newVal;

    this.setState(stateObj);
  }
  handleInput = this.handleInput.bind(this);

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#003366';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div className="modal">
        <button className="edit" onClick={this.openModal}>Edit Comment</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Edit Comment</h2>
          <button onClick={this.closeModal}>CLOSE</button>
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="comment author"
                   name="author" value={this.state.author}
                   onChange={this.handleInput} />
            <textarea placeholder="comment body" name="body"
                      value={this.state.body}
                      onChange={this.handleInput} />
            <input type="submit" />
          </form>
        </Modal>
      </div>
    );
  }
}


function mapStateToProps(state){
  return {
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch){
  return {
    editComment: (commentId, body, author) => dispatch(asyncEditComment(commentId, body, author))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCommentForm)
