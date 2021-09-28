const ChatRoom = require('../models/chatRoom')
const google = require('google-it');
const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
});
const appid = process.env.WRA_APP_ID;
const WolframAlphaAPI = require('../handlers/wra/WolframAlphaAPI.js');
let wraAPI = WolframAlphaAPI(appid);

io.on("connection", socket => {
    socket.on("new_message", ({message, roomId}) => {
        console.log("Message:", message);
        console.log("Room id", roomId);
        let mess1 = message.mess;
        const tmp = message;
        botResponse(mess1).then(reply => {
            const fullMessage = { ...tmp, ...{ botResult: reply}};
            console.log("bot res", fullMessage);
            ChatRoom.findByIdAndUpdate(roomId, {
                $push: { message: fullMessage },
            },{new:true}, (err, message) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(message)
                    io.emit('get_message', message);
                }
            });
        })
        .catch(err => console.log("bot err:", err));
    })
})

// const handleShort = (message, text) => {
// 	try {	
// 		console.log('Short message');
// 		// send the rest of the message to Wolfram|Alpha API
// 		wraAPI.getShort(text)
// 			.then(res => {
// 				message.reply(res)
// 					.catch(err => console.log(err));
// 			})
// 			.catch(err => {
// 				message.reply(String(err));
// 			});
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

exports.registerNewRoom = (req, res) => {
    console.log("body", req.body)
    const { roomName, userHost, userAdded } = req.body
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
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        ChatRoom.findByIdAndUpdate(chatRoom._id, { $push: { userAdded: arrayOfMembers } }, { new: true }).exec(
            (err, chatRoom) => {
                if (err) {
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
    ChatRoom.find({ userAdded: req.params.id })
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
    ChatRoom.find({ userHost: req.params.id })
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
    // console.log(io);
    ChatRoom.findById(id)
        // .select("-photo")
        .populate('userHost', '_id name')
        .populate('userAdded', '_id name')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: err
                });
            }
            res.send(data);
        });
};

exports.chatAdded = (req, res) => {
    console.log(req.body.userId)
    ChatRoom.find({ userAdded: req.body.userId }).sort({ createdAt: -1 })
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

const botResponse = async (msg) => {
    let res = '';
    if (msg.startsWith('!google ')) {
        const googleSearch = msg.slice(8)
        // console.log(googleSearch)
        if (googleSearch == undefined || googleSearch == ' ') {
            return null
        }
        const gRes = await google({ 'query': googleSearch }).then(results => {
            // console.log("Res: ", results);
            let vars = `Result for : ${googleSearch}`
            for (let i = 0; i < 1; i++) {
                vars += `Title : ${results[i].title}\n\nDescription : ${results[i].snippet}\n\nLink : ${results[i].link}\n\n`
            }
            // console.log("Vars: ", vars)
            return vars;
        });
        return gRes;
    } else if (msg.startsWith('!wra ')) {
        const wraSearch = msg.slice(5);
        if (wraSearch == undefined || wraSearch == ' ') {
            return null
        }
        const wraRes = await wraAPI.getShort(wraSearch)
			.then(res => {
				return res;
			})
			.catch(err => {
				console.log(err);
			});
        return wraRes;
    }
    return res;
};

exports.pushMessage = (req, res) => {
    console.log("PUSH MESSAGE CONTROLLER", req.body)
    let mess1 = req.body.message.mess;
    const tmp = req.body.message;
    botResponse(mess1).then(reply => {
        const fullMessage = { ...tmp, ...{ botResult: reply}};
        console.log("bot res", fullMessage);
        ChatRoom.findByIdAndUpdate(req.params.id, {
            $push: { message: fullMessage }
        }, (err, message) => {
            if (err) {
                console.log(err);
            } else {
                io.emit('new_message', req.body)
                res.send({
                    message: "SUCCESS"
                })
            }
        });
    });
    
    // ChatRoom.findByIdAndUpdate(req.params.id, {
    //     $push: { message: req.body.message }
    // }, (err, message) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         if (mess1.startsWith('!google ')) {
    //             const googleSearch = mess1.slice(8)
    //             console.log(googleSearch)
    //             if (googleSearch == undefined || googleSearch == ' ') {
    //                 return null
    //             }
    //             google({ 'query': googleSearch }).then(results => {
    //                 let vars = `_*Result for : ${googleSearch}*_\n`
    //                 for (let i = 0; i < 1; i++) {
    //                     vars += `\n\n\n*Title* : ${results[i].title}\n\n*Description* : ${results[i].snippet}\n\n*Link* : ${results[i].link}\n\n`
    //                 }
    //                 res.send(
    //                     {
    //                         message: "SUCCESS",
    //                     }
    //                 )
    //                 // for (let i = 0; i < 1; i++) {
    //                 //     let r = results[i]
    //                 //     console.log(r)
    //                 // }
    //                 // ChatRoom.findByIdAndUpdate(req.params.id, {
    //                 //     $push: { gresults: vars }
    //                 // }, (err, success) => {
    //                 //     if (err) {
    //                 //         console.log(err)
    //                 //     } else {
    //                 //         res.send({
    //                 //             message: "success"
    //                 //         })
    //                 //         console.log("MESSAGE_UPDATED")
    //                 //     }
    //                 // })
    //                 // console.log("GET TYPE OF",typeof results)
    //             })
    //         }
    //     }
    // })
}

exports.pushGoogleResults = (req, res) => {
    let mess1 = req.body.message.mess
    if (mess1.startsWith('!google ')) {
        const googleSearch = mess1.slice(8)
        console.log(googleSearch)
        if (googleSearch == undefined || googleSearch == ' ') {
            return null
        }
        google({ 'query': googleSearch }).then(results => {
            console.log(results)

            ChatRoom.findByIdAndUpdate(req.params.id, {
                $push: { message: req.body.message }
            }, (err, message) => {
                if (err) {
                    console.log(err)
                } else {
                    res.send({ message: "message Updated" })
                    console.log('message updated successfully !')
                }
            })
        })
    }
}