import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { changePostSortKey } from '../actions';
import { connect } from 'react-redux';
import AddPostForm from './AddPostForm'


 class Filter extends Component{

  handleSortChange = (events) => {
    const sortKey = events.target.value;
   this.props.changePostSortKey(sortKey)
  }

  render(){
    const category = this.props.match.params.category;
    const sortKey = this.props.postSortKey  // reducer
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
     this.props.categories.map((cat, key) => {
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
        value={sortKey}
        onChange={this.handleSortChange.bind(this)}
        id="select-sort" >
      <option value="voteScore" selected={sortKey === 'voteScore'} >
      Sort by Votes
      </option>
      <option value="timestamp" selected={sortKey === 'timestamp'}>
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
    categories: state.categories,
    postSortKey:state.postSortKey
  }
}

function mapDispatchToProps(dispatch){
  return{

      changePostSortKey: (key) => dispatch(changePostSortKey(key))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
