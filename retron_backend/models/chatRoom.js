const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const googleResults = {
    title: {
        type: String
    },
    link: {
        type: String
    },
    snippet:{
        type: String
    }
}

const messageBody = {
    messageSender: {
        type: String, required: true
    },
    mess: {
        type: String,
        required: true,
    },
    gresults: {
        type: [googleResults]
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