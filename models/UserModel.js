const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    email: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        min: 6
    },
    password: {
        type: String, 
        required: true,
        min: 6
    },
    friends: {
        type: Array,
        required: false
    },
    sentRequests: {
        type: Array,
        required: false
    },
    receivedRequests: {
        type: Array,
        required: false
    },
    workAssigned: {
        type: Array,
        required: false
    },
    workPending: {
        type: Array,
        required: false
    }
}, {timeStamps: true, collection: 'users'});

module.exports = schema;
