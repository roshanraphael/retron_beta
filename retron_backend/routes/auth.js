const express = require("express");
const router = express.Router();
const { register, login, getUsers } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/getusers", getUsers);

module.exports = router;
