import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <nav>
        <Link to="/" className="home-link">
        
          <h1 className="LogoFont">readable</h1>
        </Link>
      </nav>
    )
  }
}
