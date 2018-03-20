var db = require("../models");

exports.getTodos = function(req, res){
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    });
};


exports.createTodo = function(req, res){
    db.Todo.create(req.body)
    .then(function(newTodo){
        res.json(newTodo);
    })
    .catch(function(err){
        res.send(err);
    });
};

exports.findTodo = function(req, res){
    db.Todo.findById(req.params.todoid)
    .then(function(foundTodo){
        res.json(foundTodo);
    })
    .catch(function(err){
        res.send(err);
    });
};

exports.updateTodo = function(req,res){
    db.Todo.findByIdAndUpdate(req.params.todoid, req.body)
    .then(function(foundTodo){
        res.json(foundTodo);
    })
    .catch(function(err){
        res.send(err);
    });
};

exports.deleteTodo = function(req,res){
    db.Todo.findByIdAndRemove(req.params.todoid)
    .then(function(){
        res.json({message:"We deleted sth!"});
    })
    .catch(function(err){
        res.send(err);
    });
};
module.exports = exports;