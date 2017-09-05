import React, { Component } from 'react';
import  Posts from './Posts';
import Filter from './Filter'


class App extends Component {
  render() {
    return (

    <div className="App">
       <Posts/>
       <Filter/>
   </div>

    );
  }
}

export default App;
