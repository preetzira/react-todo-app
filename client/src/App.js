import React from 'react';
import './App.css';
import TodoInput from './components/todoInput';
import TodoList from './components/todoList';
import Header from './components/header';
import {decryptString, encryptString} from './encryption-module/encryption';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items:[],
      currentItem:"",
      loggedUser:""
    }
  }

  componentDidMount() {
    this.setState({
      loggedUser:localStorage.accessToken
    }, () => {
      this.hydrateStateWithLocalStorage();
    })
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // console.log(this.state,1);
    if(localStorage[this.state.loggedUser]){
      const { items, currentItem } = JSON.parse(decryptString(localStorage.getItem(this.state.loggedUser)));
      localStorage.setItem('items',encryptString(JSON.stringify(items)));
      localStorage.setItem('currentItem',encryptString(JSON.stringify(currentItem)));
      // console.log(items,currentItem)
    } else{
      localStorage.removeItem('items');
      localStorage.removeItem('currentItem');
    }
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = decryptString(localStorage.getItem(key));
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // console.log(2);
    localStorage.setItem(localStorage.accessToken,encryptString(JSON.stringify(this.state)))
    for (let key in this.state) {
      localStorage.setItem(key, encryptString(JSON.stringify(this.state[key])));
    }
  }

  addTodo = task => {
    this.newItem = {task,key:Date.now(),timestamp:Date.now(),selected:false,completed:false,expanded:false}
    this.setState({
      items:[...this.state.items, this.newItem],
      currentItem:""
    },()=>{
      localStorage.setItem("items", encryptString(JSON.stringify(this.state.items)));
      this.saveStateToLocalStorage();
    })
    
  }

  deleteTodo = key => {
    const filteredItems = this.state.items.filter(item => {
      return item.key !== key
    })
    this.setState({
      items: filteredItems
    })
  }

  editTodo = key => {
    const filteredItems = this.state.items.filter(item => {
      return item.key === key
    })
    this.setState({
      currentItem: filteredItems[0].task
    })
    this.deleteTodo(filteredItems[0].key);
  }

  selectTodo = key => {
    this.state.items.map(item => {
      if(item.key === key) item.selected = !item.selected;
    })
    this.setState({
      items:this.state.items
    })
    this.saveStateToLocalStorage();
  }

  showDetails = key => {
    this.state.items.map(item => {
      if(item.key === key) item.expanded = !item.expanded;
    })
    this.setState({
      items:this.state.items
    })
    this.saveStateToLocalStorage();
  }


  render(){
    return (
      <div>
        <Header />
        <div className="row no-gutters">
          <div className="todoApp col-10 col-md-5 mt-5 mx-auto">
            <TodoInput editTodo={this.state.currentItem} addTodo={(task)=>this.addTodo(task)}/>
            <TodoList items={this.state.items} selectTodo={(key)=>this.selectTodo(key)} deleteTodo={(key)=>this.deleteTodo(key)} editTodo={(key)=>this.editTodo(key)} showDetails={(key)=>this.showDetails(key)}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
