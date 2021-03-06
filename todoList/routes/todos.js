var express = require("express");
var router = express.Router();
var db = require("../models");
var helper = require("../helper/todos")


router.route('/')
    .get(helper.getTodos)
    .post(helper.createTodo)

router.route("/:todoid")
    .get(helper.findTodo)
    .put(helper.updateTodo)
    .delete(helper.deleteTodo);


module.exports = router;