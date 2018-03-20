import React, {Component} from "react";
import "./TodoList.css";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import * as apiCalls from "./api";
const todoAPI = "/api/todos";


class TodoList extends Component {
    constructor(props){
        super(props);
        this.state = 
        {
          todos : []
          
        };
    this.addTodo = this.addTodo.bind(this);
    }
    componentWillMount(){
        this.loadTodos();
    }
    
    async loadTodos(){
        let todos = await apiCalls.getTodos();
        this.setState({todos})
    }
    
    async addTodo(val){
        let todo = await apiCalls.addTodo(val);
        this.setState({todos: [...this.state.todos, todo]})
    }
    
    async deleteTodo(todo){
        const doneDeleting = this.state.todos.filter(todos => todos._id !== todo)
        await apiCalls.deleteTodo(todo);
        this.setState({todos:doneDeleting})
    }
    
    handleChange(todo){
       
        const updated = this.state.todos.filter(todos => todos._id === todo)
        const isDone = !updated[0].completed;
        var updatedData = {completed: isDone}
        const newState = this.state.todos.map(todos => {
               if(todos._id === todo){
                   todos.completed = isDone;
               }
               return todos
        })
        fetch(todoAPI+"/"+todo, {
            method: 'put',
            body: JSON.stringify(updatedData),
            headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(res => res.json())
        .then(this.setState({todos:newState}))
    }
    
    render(){
        const view = this.state.todos.map((item)=>(
            <TodoItem
            handleChange = {() => this.handleChange(item._id)}
            onDelete = {(e) => this.deleteTodo(item._id)}
            key = {item._id}
            {...item}/>
        ));
        return(
            <div className="todo-list">
                <h1>Todo List!</h1>
                <TodoForm 
                addTodo={this.addTodo} 
                />
                <ul>
                    {view}
                </ul>
            </div>
            );
    }
}




export default TodoList;