import React, { Component } from 'react';
import ToDo from './ToDo';
import $ from 'jquery';

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDelete(id) {
    $.ajax({
      url: `../api/todos/${id}`,
      type: 'DELETE',
      success: () => {
        this.props.handleDelete();
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    $.ajax({
      url: './../api/todos',
      type: 'POST',
      data: { times: 60,
              position: 1,
              todo: 'todo'
            },
      success: () => {
        this.props.handleSubmit();
      }
    });
  }

  handleUpdate(item, update) {
    console.log(update);
    $.ajax({
      url: `../api/todos/${item}`,
      type: 'PUT',
      data: { id: update.id,
              times: update.times,
              position: update.position,
              todo: update.todo
            },
      success: () => {
        this.props.handleUpdate();
      }
    });
  }

  render() {
    console.log(this.props.items);
    var items = this.props.items.map((today) => {
      return (
        <ToDo key={today.id}
              item={today}
              handleDelete={this.handleDelete.bind(this, today.id)}
              handleUpdate={this.handleUpdate.bind(this, today.id)}
               />
      )
    });

    return (
      <div className="toDoList">
        <div>
          <button className="btn btn-success" onClick={this.handleSubmit}>item +</button>
          <div className="top-list-margin"> </div>
          <ul className="list-times">
            <li className="list-item">8am</li>
            <li className="list-item">9am</li>
            <li className="list-item">10am</li>
            <li className="list-item">11am</li>
            <li className="list-item">12pm</li>
            <li className="list-item">1pm</li>
            <li className="list-item">2pm</li>
            <li className="list-item">3pm</li>
            <li className="list-item">4pm</li>
            <li className="list-item">5pm</li>
            <li className="list-item">6pm</li>
          </ul>
        </div>
        {items}
      </div>
    )
  }
}

export default ToDoList;
