import React, { Component } from 'react';
import Modal from 'react-modal';
import {  asyncAddPost, toggleAddPostModal, changeAddPostForm} from '../actions'
import { FaClose } from 'react-icons/lib/fa';
import { connect } from 'react-redux'


const customStyles = {
  overlay : {
     position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.5)'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

 class AddPostForm extends Component {


   toggleModal = this.toggleModal.bind(this);

  handleSubmit(events) {
    events.preventDefault();
    const post = this.props.postToAdd;
    this.props.addPost(post).then(this.toggleModal());

    const initialPostState = {
      author: '',
      body: '',
      title: '',
      category: 'react'
    }
    this.props.changePostToAdd(initialPostState);
  }



    handleSubmit = this.handleSubmit.bind(this);

    handleInput(events) {
      const newVal = events.target.value;
      const property = events.target.name;

      let post = Object.assign({}, this.props.postToAdd);
      post[property] = newVal;

      this.props.changePostToAdd(post);
    }
    handleInput = this.handleInput.bind(this);

  toggleModal() {
    this.props.toggleModal();
  }


render() {
  const post = this.props.postToAdd;
    return (
      <div className="modal">
        <button className="add" onClick={this.toggleModal}>Add Post</button>
        <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.toggleModal}
          style={customStyles}
          contentLabel="Add  Post"
        >
        <div>
          <h2 className="modal-title" >Add a New Post</h2>
              <FaClose className="modal-close" onClick={this.toggleModal} />
                </div>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="author">
            <p>Author</p>
            <input type="text"
                   placeholder="post author"
                   id="author"
                   name="author"
                   value={post.author}
                   onChange={this.handleInput} />
          </label>
          <label htmlFor="title">
            <p>Title</p>
            <input type="text"
                   placeholder="post title"
                   id="title"
                   name="title"
                   value={post.title}
                   onChange={this.handleInput} />
          </label>
          <label for="body">
          <p>Body</p>
          <textarea placeholder="post body"
                    name="body"
                    id="body"
                    value={post.body}
                    onChange={this.handleInput} />
          </label>
          <label htmlFor="category">
          <p>Category</p>
            <select name="category"
             id="category"
             value={post.category}
            onChange={this.handleInput} >
            {
              this.props.categories.map((cat,key) =>
                              <option key= { key} value={cat.name}>{cat.name}</option>
                            )
                          }
                        </select>
                      </label>
                      <input type="submit" />
                    </form>
                  </Modal>
                </div>
    );
  }
 }

 function mapStateToProps(state){
   return{
     categories: state.categories,
     modalIsOpen: state.addPostModalIsOpen,
    postToAdd: state.postToAdd
   }
 }

 function mapaDispatchToProps(dispatch){
   return {
       addPost: (post) => dispatch(asyncAddPost(post)),
      toggleModal: () => dispatch(toggleAddPostModal()),
    changePostToAdd: (post) => dispatch(changeAddPostForm(post))
   }
 }
 export default connect(
   mapStateToProps,
   mapaDispatchToProps
 )(AddPostForm)
