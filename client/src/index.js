import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import DailySchedule from './components/DailySchedule';
import {requireAuth} from './utils/AuthService';
import { Router, Route, browserHistory } from 'react-router';

const Root = () => {
  return (
    <div className="container">
      <Router history={browserHistory}>
        <Route path="/" component={ Login } />
        <Route path="/today" component={ DailySchedule } onEnter={requireAuth} />
      </Router>
    </div>
  )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
