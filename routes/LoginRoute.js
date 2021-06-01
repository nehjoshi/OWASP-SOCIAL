const express = require('express');
const LoginRoute = express();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const schema = require('../models/UserModel.js');
const jwt = require('jsonwebtoken');

LoginRoute.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const User = await mongoose.model('User', schema);
    const userName = await User.findOne({username: username});
    if (!userName) return res.send({message: 'Username does not exist'});

    const truePwd = await userName.password;
    const compare = await bcrypt.compare(password, truePwd);
    if (compare===false) return res.send({message: 'Incorrect Password'});

    const token = await jwt.sign({_id: userName._id}, process.env.SECRET_KEY);
    return res.send({message: 'Successfully Logged In', token: token, userData: userName});

});
module.exports = LoginRoute;