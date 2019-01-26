const Todo = require('../models/todo.model');

exports.todo_create = function (req, res, next) {
    let todo = new Todo({
        task: req.body.task,
        done: req.body.done,
    });
    todo.save(function (err) {
        if (err) {
            return next({
                status: 400,
                error: err,
            });
        }
        res.send('Great! Your task was created successfully!');
    })
};

exports.todo_get = function (req, res) {
    Todo.find(req.params, function (err, tasks) {
        if (err) return next({
            status: 404,
            error: err,
        });
        res.send(tasks);
    })
};

exports.todo_update = function (req, res, next) {
    Todo.findOneAndUpdate(req.params.id, {$set: req.body}, function (err, task) {
        if (err) return next({
            status: 400,
            error: err
        });
        res.send('Task was successfully udpated.');
    });
};

exports.todo_delete = function (req, res , next) {
    Todo.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next({
            status: 400,
            error: err,
        });
        res.send('Your task was successfully deleted!');
    })
};