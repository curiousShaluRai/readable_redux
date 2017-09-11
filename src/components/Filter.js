import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../actions';
import { connect } from 'react-redux';
import AddPostForm from './AddPostForm'


 class Filter extends Component{
  state = {
    categories: [],
    category:'',
    sortKey: 'voteScore'
  }

  componentWillMount = () => {
  this.props.fetchCategories();

  }

  componentWillReceiveProps = (newVal) => {

  const categories = newVal.categories;
    this.setState({  categories });
  }

  handleSortChange = (events) => {
    const sortKey = events.target.value;
    this.setState({sortKey});
    this.props.sortPosts(sortKey);
  }

  render(){
    const category = this.props.match.params.category;
    return (

  <div className = "filter">

   <h1> Category</h1>
   <Link to="/">
   <label htmlFor="all">
   <input
   type ="radio"
   name="category"
    value="all"
    id="all"
    checked = {typeof category === 'undefined'}
    />
   All
   </label>
   </Link>

   {
     this.state.categories.map((cat, key) => {
       return(

     <Link  key= {key} to= {`/${cat.name}`}>
      <p>
     <label htmlFor = {cat.name} >
       <input
        type= "radio"
        name= "category"
        value= {cat.name}
        id={cat.name}
        checked= {category === cat.name}/>
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


<div>

   <AddPostForm  />
   </div>
</div>
)
}
}

function mapStateToProps(state){
  return{
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch){
  return{
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
