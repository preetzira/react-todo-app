import React from 'react';
import '../App.css';
import TodoItem from './todoItem';

const TodoList = props =>{
  return(
  <div className="row no-gutters">
    <div className="col-md-12 mt-md-0 p-0 mx-auto">
      <TodoItem items={props.items} selectTodo={props.selectTodo} deleteTodo={props.deleteTodo} editTodo={props.editTodo} showDetails={props.showDetails}/>
    </div>
  </div>
  )
}


export default TodoList;
