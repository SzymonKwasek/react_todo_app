import React, {Component} from "react";
import "./TodoForm.css"


class TodoForm extends Component {
    
    constructor(props){
        super(props)
        this.state = {inputValue: ""}
    }
    
    handleChange = (e) =>{
        this.setState({inputValue: e.target.value})
    }
    
    handleSubmit = (e) =>{
        this.handleChange(e)
        this.props.addTodo(this.state.inputValue)
    }
    render(){
        return(
            <div className="form-input">
                <input 
                type="text"
                value = {this.state.inputValue}
                onChange = {this.handleChange}
                placeholder = ""
                />
                <button
                onClick = {this.handleSubmit}
                >Add item</button>
            </div>
            )
    }
    
    
}





export default TodoForm;