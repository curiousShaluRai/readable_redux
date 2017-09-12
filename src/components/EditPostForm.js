import React, { Component } from 'react';
import Modal from 'react-modal';
import { fetchCategories, asyncEditPost } from '../actions'
import { connect } from 'react-redux'
import { FaEdit, FaClose } from 'react-icons/lib/fa';


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

 class EditPostForm extends Component {

  state = {
      modalIsOpen: false,
      categories: [],
      author: '',
      body: '',
      title: '',
      category: ''
    };

  openModal = this.openModal.bind(this);
  closeModal = this.closeModal.bind(this);


  componentWillMount() {
    const post = this.props.post;
    this.setState({
       author: post.author,
       body: post.body,
        title: post.title,
         category: post.category })

    this.props.fetchCategories()
  }

  componentWillReceiveProps(newVal) {

    const categories = newVal.categories
    this.setState({ categories })

  }

  handleSubmit(events) {
    events.preventDefault();

    const author = this.state.author;
    const body = this.state.body;
    const title = this.state.title;
    const category = this.state.category;
    const postId = this.props.post.id;

    this.props.editPost(postId, author, body, title, category)
    .then(this.closeModal())
  }

  handleSubmit = this.handleSubmit.bind(this);

  handleInput(events) {
    const newVal = events.target.value;
    const property = events.target.name;

    let stateObj = Object.assign({}, this.state);
    stateObj[property] = newVal;

    this.setState(stateObj);
  }

  handleInput = this.handleInput.bind(this);

  openModal() {
    this.setState({ modalIsOpen: true });
  }



  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div className="modal">
        <FaEdit
        className="edit-button"
        onClick={this.openModal} />
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

        <div>
       <h2 className="modal-title" ref={subtitle => this.subtitle = subtitle}>Edit Post</h2>
       <FaClose className="modal-close" onClick={this.closeModal} />
     </div>
     <form onSubmit={this.handleSubmit}>
       <label for="author">
         <p>Author</p>
         <input type="text"
               placeholder="post author"
                id="author"
                name="author"
                 value={this.state.author}
                onChange={this.handleInput} />
       </label>
       <label for="title">
         <p>Title</p>
         <input type="text"
               placeholder="post title"
                id="title"
                name="title"
                 value={this.state.title}
                onChange={this.handleInput} />
       </label>
       <label for="body">
         <p>Body</p>
         <textarea
          placeholder="post body"
           name="body"
           id="body"
          value={this.state.body}
          onChange={this.handleInput} />
       </label>
       <label for="category">
         <p>Category</p>
         <select name="category"
                 id="category"
                 value={this.state.category}
                 onChange={this.handleInput} >
           {
             this.state.categories.map((cat, key) =>
               <option key = {key} value={cat.name}>{cat.name}</option>
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
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch){
  return{
    fetchCategories: () => dispatch(fetchCategories()),
    editPost: (postId, author, body, title, category) => dispatch(
      asyncEditPost(postId, author, body, title, category))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPostForm)
