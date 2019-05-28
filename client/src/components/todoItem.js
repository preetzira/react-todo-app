import React from 'react';
import '../App.css'

const TodoItem = ({items,selectTodo,deleteTodo,editTodo,showDetails}) =>{
  if(!items.length){
    return(
      <ul className="list-group">
        <li className="list-group-item text-center text-grey">Nothing to do</li>
      </ul>
    )
  }
  return(
    <ul className="list-group">
      {items.map(item=>(
        <div key={item.key}>
          <li className="list-group-item p-0">
            <ul className="list-group list-group-horizontal no-gutters">
              <li className="w-10 list-group-item d-flex justify-content-center align-self-center p-2">
                <div className="custom-control custom-checkbox">
                  <input onChange={()=>selectTodo(item.key)} type="checkbox" className="custom-control-input" id={item.key.toString(36)} name="selected" checked={item.selected}/>
                  <label className="custom-control-label" htmlFor={item.key.toString(36)}></label>
                </div>
              </li>
              <li className={`w-70 list-group-item p-2 task-info ${(item.selected)?"completed-task":""}`} onClick={()=>showDetails(item.key)}>{item.task}</li>
              <li className="w-20 list-group-item d-flex justify-content-center p-2">
                <button className="btn btn-outline-secondary btn-sm align-self-center mr-1 edit-todo" onClick={()=>editTodo(item.key)} disabled={item.selected}>&#x270E;</button>
                <button className="btn btn-outline-danger btn-sm align-self-center" onClick={()=>deleteTodo(item.key)} disabled={item.selected}>&#x2716;</button>
              </li>
            </ul>
          </li>
          <div className={`row no-gutters text-secondary small ${(item.expanded)?"show-details":"hide-details"}`}>
            <div className="col-3"><span className="p-1">{(item.selected)?"Completed":"Pending"}</span></div>
            <div className="col-9 text-right"><span className="p-1">{(new Date(item.timestamp).toString().substr(0,24).trim())}</span></div>
          </div>
        </div>
      ))}
    </ul>
  )
}


export default TodoItem;
