const mongoose = require('mongoose');
const { Schema } = mongoose;

const boardSchema = new Schema({
    "id": {
        type: Number,
        required: true,
    },
    "objectID": {
        type: Number,
        required: true,
    },
    "title": {
        type: String,
        required: true,
    },
    "content": {
        type: String,
        required: true,
    },
    "datetime": {
        type: Number
    },
    "musicname": {
        type: String
    },
    "musiclink": {
        type: String
    },
    "file": {
        type: String
    },
    "tagfriends": {
        type: Array
    },
    "sharefriends": {
        type: Array
    },
    "timestampID": {
        type: String
    },
    "isTimestamp": {
        type: Boolean
    }
});

module.exports = mongoose.model('Board', boardSchema);