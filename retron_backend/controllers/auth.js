const User = require('../models/users')
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.register = (req, res) => {
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }

        const { name, username, email, password } = req.body;
        // let username = shortId.generate();
        let profile = `${process.env.CLIENT_URL}/profile/${username}`;

        let newUser = new User({ name, email, password, profile, username });
        newUser.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json({
                message: 'Registered success! Please Login.'
            });
        });
    });
};

exports.login = (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    User.findOne({ email })
    .exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please Register.'
            });
        }
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match.'
            });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, { expiresIn: '1d' });
        const { _id, username, name, email, role } = user;
        return res.json({
            token,
            user: { _id, username, name, email, role }
        });
    });
};

exports.getUsers = (req, res) => {
    User.find({})
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        });
};