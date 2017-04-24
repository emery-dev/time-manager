import React, { Component } from 'react';
import Draggable from 'react-draggable';

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = { editMode: false,
                   deltaPosition: {
                     x: 0, y: 0
                   }
                  };

    this.handleDrag = this.handleDrag.bind(this);
    this.handleEditYPosition = this.handleEditYPosition.bind(this);
  }

  handleDrag(e, ui) {
    const {x, y} = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY
      }
    });
  }

  toggleEditMode() {
    this.setState({ editMode: !this.state.editMode });
  }

  handleEditYPosition() {
    var id = this.props.item.id;
    var position = this.state.deltaPosition.y.toFixed(0);
    var times = this.props.item.times;
    var todo = this.props.item.todo;

    var item = { id: id,
                 position: position,
                 times: times,
                 todo: todo };
    var todo = { times: times, position: position, todo: todo };
    this.props.handleUpdate(item, todo);
  }

  handleEdit(target) {
    if (this.state.editMode == true && target.charCode==13) {
      var id = this.props.item.id;
      var position = this.state.deltaPosition.y; //should then translate on load?
      var times = this.refs.times.value;
      var todo = this.refs.todo.value;

      var item = { id: id,
                   position: position,
                   times: times,
                   todo: todo };
      var todo = { times: times, position: position, todo: todo };
      this.props.handleUpdate(item, todo);

      this.toggleEditMode();
    }
  }

  render() {
    const {deltaPosition} = this.state;
    var time = this.state.editMode ? <input type='text' className="form-control form-item-times" ref='times' defaultValue={this.props.item.times} onKeyPress={this.handleEdit.bind(this)} /> : <h5 className="panel-title" onClick={this.toggleEditMode.bind(this)}>{this.props.item.times} Minutes</h5>;
    var todo = this.state.editMode ? <input type='text' className="form-control form-item-todo" ref='todo' defaultValue={this.props.item.todo} onKeyPress={this.handleEdit.bind(this)} /> : <h1 style={(this.props.item.times > 99 ? {paddingBottom:'150px', transform:'translateY(70px)'} : {})}><span className="toDoText" onDoubleClick={this.toggleEditMode.bind(this)}>{this.props.item.todo}</span></h1>;
    return (
      <Draggable
        axis='y'
        handle="strong"
        defaultPosition={{x: 0, y: this.props.item.position}}
        onDrag={this.handleDrag}
        onStop={this.handleEditYPosition}
        >
      <div className="todo-item col-sm-11">
        <div className="panel panel-primary">
            <strong className="cursor">
            <div className="panel-heading">
              { time }
              <button className="btn btn-danger" onClick={this.props.handleDelete}><span className="glyphicon glyphicon-remove"></span></button>
            </div>
          </strong>
          <div className="panel-body">
            { todo }
          </div>
        </div>
      </div>
    </Draggable>
    )
  }
}

export default ToDo;
