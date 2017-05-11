import React, { Component } from 'react';
import Nav from './Nav';
import ToDoList from './ToDoList';
import { getDailySchedule } from '../utils/daily-manager-api';

class DailySchedule extends Component {
  constructor(props) {
    super(props);
    this.state = { today: [] };

    this.handleRefresh = this.handleRefresh.bind(this);
  }

  updateToday() {
    getDailySchedule().then((today) => {
      this.setState({ today: today.data });
    });
  }

  componentWillMount() {
    this.updateToday();
  }

  //All our functions we pass down are
  //only updating the list from the server
  //So, we only need to define one refresh
  //function and pass that down for each
  //successful ajax request.
  handleRefresh() {
    this.updateToday();
  }

  render() {
    var today = new Date();
    var day = today.getDay();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    return (
      <div>
        <Nav />
        <strong><h1 className="text-center schedule-text">Your Schedule Today, {month}/{day}/{year} </h1></strong>
        <ToDoList items={this.state.today}
                  handleSubmit={this.handleRefresh}
                  handleDelete={this.handleRefresh}
                  handleUpdate={this.handleRefresh}
          />
    </div>
    )
  }
}

export default DailySchedule;
