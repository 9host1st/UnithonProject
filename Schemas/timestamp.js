const mongoose = require('mongoose');
const { Schema } = mongoose;

const timestampSchema = new Schema({
    "objectID": {
        type: Number
    },
    "postID": {
        type: Array
    },
    "sharefriends": {
        type: Array
    },
    "timeinterval": {
        type: Number
    },
    "limits": {
        type: Number
    }
});

module.exports = mongoose.model('timestamp', timestampSchema);