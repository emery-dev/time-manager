import React, { Component } from 'react';
import ToDo from './ToDo';
import $ from 'jquery';

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteAll = this.handleDeleteAll.bind(this);
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

  handleDeleteAll() {
    $.ajax({
      url: './../api/todos',
      type: 'DELETE',
      success: () => {
        this.props.handleDelete(); //just refreshing the api
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
              todo: 'todo',
              color: 'color-green'
            },
      success: () => {
        this.props.handleSubmit();
      }
    });
  }

  handleUpdate(item, update) {
    $.ajax({
      url: `../api/todos/${item}`,
      type: 'PUT',
      data: { id: update.id,
              times: update.times,
              position: update.position,
              todo: update.todo,
              color: update.color
            },
      success: () => {
        this.props.handleUpdate();
      }
    });
  }

  render() {
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
          <div className="todo-list-button-holder">
            <button className="btn btn-success" onClick={this.handleSubmit}>new item</button>
            <button className="btn btn-danger delete-all" onClick={this.handleDeleteAll}>delete all</button>
          </div>
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
