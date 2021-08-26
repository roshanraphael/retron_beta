const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const messageBody = {
    messageSender: {
        type: String, required: true
    },
    mess: {
        type: String,
        required: true,
    }
}

const chatRoomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true
    },
    userHost: {
        type: ObjectId, ref: 'User'
    },
    userAdded: [{
        type: ObjectId, ref: 'User', required: true
    }],
    message: {
        type: [messageBody]
    }
},
{ timestamp: true }
);

module.exports = mongoose.model('chatRoom', chatRoomSchema);