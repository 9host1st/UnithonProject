const mongoose = require('mongoose');
const { Schema } = mongoose;

const friendsSchema = new Schema({
    "id": {
        type: Number, 
    },
    "friendsID": {
        type: Array,
    }
});

module.exports = mongoose.model('Friends', friendsSchema);
