const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    task: String,
    done: Boolean,
});

module.exports = mongoose.model('Todo', todoSchema);