import React,{Component} from 'react';
import '../App.css';

class TodoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:""
    }
  }

  handleInput = e => {
   this.setState({value:e.target.value})
  }

  handleSubmit = () => {
    this.props.addTodo(this.state.value);
    this.setState({value:""})
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.editTodo!==this.props.editTodo){
      this.setState({value: this.props.editTodo});
    }
  }

  render(){
    return (
      <div className="col-12 col-sm-12 mt-md-0 p-0 mx-auto">
        <form action="javascript:void(0)" onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input value={this.state.value} onChange={this.handleInput} type="text" className="p-4 form-control br-b-0" id="todoInput" placeholder="Enter task to do" required/>
            <div className="input-group-append">
              <button type="submit" className="btn btn-outline-primary add-todo p-2">Add task</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default TodoInput;
