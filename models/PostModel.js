const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    auth: {
        type: String,
        required: false
    },
    posts: {
        type: Array,
        required: false
    }
}, {timestamps: true, collection: 'posts'});

module.exports = schema;