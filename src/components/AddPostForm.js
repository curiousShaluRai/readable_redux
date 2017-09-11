import React, { Component } from 'react';
import Modal from 'react-modal';
import { fetchCategories, asyncAddPost} from '../actions'
import { connect } from 'react-redux'


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

 class AddPostForm extends Component {


    state = {
      modalIsOpen: false,
      categories: [],
      author : '',
      body : '',
      title: '',
      category: ''
    };

  openModal = this.openModal.bind(this);
   afterOpenModal = this.afterOpenModal.bind(this);
   closeModal = this.closeModal.bind(this);

  componentWillMount() {
  this.props.fetchCategories();
  }

  componentWillReceiveProps(newVal){
    const categories = newVal.categories;
    this.setState({categories});

  }

  handleSubmit(events) {
    events.preventDefault();

     const author = this.state.author;
      const body = this.state.body;
      const title = this.state.title;
      const category = this.state.category;


     this.props.addNewPost(author, body, title, category)
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
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#003366'; // color of add a new post
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }


render() {
    return (
      <div className="modal">
        <button className="add" onClick={this.openModal}>Add Post</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Add  Post"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Add a New Post</h2>
          <button onClick={this.closeModal}>close</button>
          <form onSubmit = {this.handleSubmit} >
            <input type="text"
            placeholder="post author"
            name = "author"
            value = {this.state.author}
            onChange = {this.handleInput}
            />
            <input type="text"
            placeholder="post title"
            name = 'title'
            value = {this.state.title}
            onChange = {this.handleInput}
            />
            <textarea
            placeholder="post body"
            name = "body"
            value = {this.state.body}
            onChange= { this.handleInput}
             />
            <select
            name= "category"
            value = {this.state.category}
            onChange = {this.handleInput}>
              {
                this.state.categories.map((cat , key) =>
                  <option key = {key} value={cat.name}>{cat.name}</option>
                )
              }
            </select>
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

 function mapaDispatchToProps(dispatch){
   return {
     fetchCategories: () => dispatch(fetchCategories()),
     addNewPost: (author, body, title, category) => dispatch(
       asyncAddPost(author,body,title,category))
   }
 }
 export default connect(
   mapStateToProps,
   mapaDispatchToProps
 )(AddPostForm)
