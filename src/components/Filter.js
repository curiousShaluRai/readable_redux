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


  <div className={`overlay ${this.props.slideClass}`}>
   <div className={`filters ${this.props.slideClass}`}>
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
  <label htmlFor="select-sort" className="select-sort-label">
      <h3>Sort Type</h3>
      <select
        value={this.state.sortKey}
        onChange={this.handleSortChange.bind(this)}
        id="select-sort" >
      <option value="voteScore" selected={this.state.sortKey === 'voteScore'} >
      Sort by Votes
      </option>
      <option value="timestamp" selected={this.state.sortKey === 'timestamp'}>
      Sort by Time
      </option>
      </select>
      </label>

}
<div>
   <AddPostForm  />
   </div>
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
