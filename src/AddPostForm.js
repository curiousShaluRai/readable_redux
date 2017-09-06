import React, { Component } from 'react';

import Modal from 'react-modal';
import * as ReadableAPI from './utils/ReadableAPI';
;

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

export default class AddPostForm extends Component {


    state = {
      modalIsOpen: false,
      categories: []
    };

    openModal = this.openModal.bind(this);
   afterOpenModal = this.afterOpenModal.bind(this);
   closeModal = this.closeModal.bind(this);


  componentWillMount() {
    ReadableAPI
    .getAllCategories()
    .then((categories) => this.setState({categories}))
  }

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
          contentLabel="Apply  Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Add a New Post</h2>
          <button onClick={this.closeModal}>close</button>
          <form>
            <input type="text" placeholder="post author"/>
            <input type="text" placeholder="post title"/>
            <textarea placeholder="post body" />
            <select>
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
