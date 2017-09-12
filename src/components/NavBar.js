import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/lib/fa'

export default class NavBar extends Component {
  render() {
    return (
      <nav>
        <Link to="/" className="home-link">

          <h1>Readable</h1>
        </Link>
        {
          <FaBars className="hamburger" onClick={this.props.toggleFilters} />
        }
      </nav>
    )
  }
}
