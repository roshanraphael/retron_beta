const ChatRoom = require('../models/chatRoom')

exports.registerNewRoom = (req, res) => {
    console.log("body",req.body)
        const { roomName, userHost, userAdded} = req.body
        // let userAdded = userAdded
        if (!userHost || !userHost.length) {
            return res.status(400).json({
                error: 'userHost is required'
            });
        }

        if (!userAdded || userAdded.length === 0) {
            return res.status(400).json({
                error: 'At least one Member is required'
            });
        }

        let newRoom = new ChatRoom()
        newRoom.roomName = roomName
        newRoom.userHost = userHost
        let arrayOfMembers = userAdded
        console.log('Array', arrayOfMembers)

        newRoom.save((err, chatRoom) => {
            if(err){                
                return res.status(400).json({
                    error: err
                })
            }
            ChatRoom.findByIdAndUpdate(chatRoom._id, {$push: {userAdded: arrayOfMembers}}, {new: true}).exec(
                (err, chatRoom) => {
                    if(err) {
                        return res.status(400).json({
                            error: err
                        })
                    } else {
                        res.json(chatRoom)
                    }
                }    
            )
        })

}

exports.getRooms = (req, res) => {
    console.log(req.params.id)
    ChatRoom.find({userAdded: req.params.id})
    .sort({ createdAt: -1 })
        .exec((err, data) => {
            if (err) {
                console.log(err)
                return res.json({
                    error: err
                });
            }
            console.log(data)
            res.json(data);
        });
};
exports.getHostRooms = (req, res) => {
    console.log(req.params.id)
    ChatRoom.find({userHost: req.params.id})
    .sort({ createdAt: -1 })
        .exec((err, data) => {
            if (err) {
                console.log(err)
                return res.json({
                    error: err
                });
            }
            console.log(data)
            res.json(data);
        });
};
exports.getSingleRoom = (req, res) => {
    const id = req.params.id;
    ChatRoom.findById( id )
        // .select("-photo")
        .populate('userHost', '_id name')
        .populate('userAdded', '_id name')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: err
                });
            }
            res.json(data);
        });
};

exports.chatAdded = (req, res) => {
    console.log(req.body.userId)
    ChatRoom.find({userAdded: req.body.userId}).sort({ createdAt: -1 })
      .exec((err, room) => {
        if (err) {
            return res.json({
                error: err
            });
        }
        // console.log(room)
        res.json(room);
    });
}

exports.pushMessage = (req, res) => {
    console.log(req.body)
    ChatRoom.findByIdAndUpdate(req.params.id, {
        $push: {message: req.body.message}
    }, (err, message) => {
        if (err) {
            console.log(err)
        } else {
            res.send({message: "message Updated"})
            console.log('message updated successfully !')
        }
    })
}