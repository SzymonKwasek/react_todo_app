import React from "react";
import "./TodoItem.css"

const TodoItem = ({name, completed, onDelete, handleChange}) =>(
    <div>
    <li>
        <span
            className="todo"
            onClick = {handleChange}
            style={{
                textDecoration : completed ? "line-through": "none"
            }}>  
               {name}
        </span>
        <span
            className = "delete-todo"
            onClick = {onDelete} 
        > X </span>
    </li>
    <hr/>
    </div>
    )


export default TodoItem;