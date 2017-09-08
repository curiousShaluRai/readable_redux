import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ReadableAPI from '../utils/ReadableAPI';


export default class Filter extends Component{
  state = {
    categories: [],
    category:'',
    sortKey: 'voteScore'
  }

  componentWillMount = () => {
    ReadableAPI
    .getAllCategories()
    .then((categories) => this.setState({categories}))
  }

  componentWillReceiveProps = (newVal) => {
  const category = newVal.match.params.category || '';
    this.setState({ category });
  }

  handleSortChange = (events) => {
    const sortKey = events.target.value;
    this.setState({sortKey});
    this.props.sortPosts(sortKey);
  }

  render(){
    return (

  <div className = "filter">

   <h1> Category</h1>
   <Link to="/">
   <label htmlFor= "all">
   <input
   type = "radio"
   name="category"
    value=""
    id="all"
    checked = {this.state.category === ''}
    />
   All
   </label>
   </Link>

   {
     this.state.categories.map((cat, key) => {
       return(
     <Link  key= {key} to = {cat.name}>
     <p>
       <label htmlFor = {cat.name} >
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
     })
}
{
  <select
  value={this.state.sortKey}
  onChange= {this.handleSortChange.bind(this)} >
  <option
  value = "voteScore"
  selected = {this.state.sortKey === 'voteScore'} >
  Sort By Votes
  </option>
  <option
  value = "timeStamp"
  selected= {this.state.sortKey === 'timeStamp'}
  >
  Sort By Time
  </option>
  </select>
}


</div>
)
}
}
