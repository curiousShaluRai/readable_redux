import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ReadableAPI from '../utils/ReadableAPI';


export default class Filter extends Component{
  state = {
    categories: [],
    category:''
  }

  componentWillMount = () => {
    ReadableAPI.getAllCategories().then((categories) => this.setState({categories}))
  }

  componentWillReceiveProps = (newVal) => {
  const category = newVal.match.params.category || '';
    this.setState({ category });
  }

  render(){
    return (

  <div className = "filter">

   <h1> Category</h1>
   <Link to="/">
   <label for= "all">
   <input
   type = "radio"
   name="category"
    value=""
    id="all"
    checked = {this.state.category === ''}/>
   All
   </label>
   </Link>

   {
     this.state.categories.map((cat, key) => {
       return(
     <Link to = {cat.name}>
     <p key = {key}>
       <label for = {cat.name} key= {key}>
       <input
        type= "radio"
        name= "category"
        value= {cat.name}
        id={cat.name}
        checked= {this.state.category === cat.name}/>
       {cat.name}
       </label>
       </p>
       </Link>

        )
     }

)

}

</div>
)
}
}
