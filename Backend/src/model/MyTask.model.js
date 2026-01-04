const mongoose = require('mongoose');

const myTaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    statusId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskStatus',
        required: true
    },
    priorityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskPriority',
        required: true
    }
}{timestamps:true});

module.exports = mongoose.model('MyTask', myTaskSchema);
