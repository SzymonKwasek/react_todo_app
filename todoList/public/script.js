/* global $ */

$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos)
    
    $("#todoInput").keypress(function(event){
        if(event.which == 13){
            createTodo();
        }
    })
    
     $(".list").on("click",'li', function(){
        updateTodo($(this));
    })
    
    $(".list").on("click","span", function(e){
        // separates span listeners from li listener
        e.stopPropagation();
        removeTodo($(this).parent());
    })
    
    
    
});

function addTodos(todos){
    todos.forEach(function(todo){
        addTodo(todo);
    })   
}

function addTodo(todo){
    var newTodo = $('<li class="task">'+todo.name+"<span>X</span></li>");
    newTodo.data("id",todo._id);
    newTodo.data("completed", todo.completed);
    if(todo.completed){
        newTodo.addClass("done");
    }
    $(".list").append(newTodo);
}

function createTodo(){
    var usrInput = $("#todoInput").val();
    $.post("/api/todos", {name: usrInput})
    .then(function(newTodo){
        console.log(newTodo);
        $('#todoInput').val('');
        if(!newTodo.errors){
        addTodo(newTodo);
        }
    })
    .catch(function(err){
        console.log("Error!")
        console.log(err);
    })
}

function removeTodo(todo){
     var clickedId = todo.data("id");
        
        $.ajax({
            method: "DELETE",
            url: "/api/todos/"+clickedId
        })
        .then(function(data){
            todo.remove();
        })
}

function updateTodo(todo){
   var clickedId = todo.data('id');
   var isDone = !todo.data("completed");
   var updatedData = {completed: isDone}
   $.ajax({
       method: "PUT",
       url: "api/todos/" + clickedId,
       data: updatedData
   })
   .then(function(data){
       todo.toggleClass("done");
       todo.data("completed", isDone);
   })
   .catch(function(err){
       console.log(err);
   })
}