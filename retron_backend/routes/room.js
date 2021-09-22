const express = require('express')
const router = express.Router()
const { registerNewRoom, getRooms, getSingleRoom, getHostRooms, chatAdded, pushMessage } = require('../controllers/Room')

router.post('/registerroom', registerNewRoom)
router.get('/getroom/:id', getRooms)
router.get('/gethostRoom/:id', getHostRooms)
router.get('/chatrooms/:id', getSingleRoom)
router.get('/getadded/', chatAdded)
router.put('/sendmessages/:id', pushMessage)
module.exports = router