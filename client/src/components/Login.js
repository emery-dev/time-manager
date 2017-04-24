import React, { Component } from 'react';
import { login } from '../utils/AuthService';
import Nav from './Nav';

class Login extends Component {

  render() {
    return (
      <div>
        <Nav />
        <div className="container">
          <div className="jumbotron">
            <h1 className="text-center">Daily Schedule Manager <br /> <br />
              <span className="glyphicon glyphicon-calendar"> </span>
              <span className="glyphicon glyphicon-hourglass"> </span>
              </h1>
              <button className="btn btn-info log" onClick={() => login()}>Enter Here</button>
          </div>
        </div>
      </div>
    )
  }

}

export default Login;
