import React, { Component } from 'react';
import { Link } from 'react-router';
import { login, logout, isLoggedIn } from '../utils/AuthService';
import '../App.css';

class Nav extends Component {

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/"><h1 className="glyphicon glyphicon-dashboard"></h1></Link>
        </div>
        <ul className="nav navbar-nav">
          <li>
            {
              (isLoggedIn()) ? <Link to='/today'>Schedule</Link> : ''
            }
            </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
            {
             (isLoggedIn()) ? ( <button className="btn btn-danger top-login" onClick={() => logout()}>Log out </button> ) : ( <button className="btn btn-info top-login" onClick={() => login()}>Log In</button> )
            }
          </li>
        </ul>
      </nav>
    )
  }
}

export default Nav;
