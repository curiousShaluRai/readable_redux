import React, { Component } from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';


export default class Filter extends Component{
  state = {
    categories: []
  }

  componentWillMount = () => {
    ReadableAPI.getAllCategories().then((categories) => this.setState({categories}))
  }



  render(){
    return (

  <div className = "filter">
   <h1> Categories </h1>
   {
     this.state.categories.map((cat, key) => <p key= {key}>{cat.name} </p>)
   }

  </div>



    )
  }
}
