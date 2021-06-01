const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const schema = require('../models/UserModel.js');
const RegVal = require('../validation/RegVal');
const RegisterRoute = express();

RegisterRoute.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    if (RegVal({email, username, password})){
        return res.send({message: 'Invalid Email Address'});
    }

    const User = await mongoose.model('User', schema);
    const user = await User.findOne({email: email})
    if (user) {
        return res.send({message: 'Email already Exists!'});
    }
    const usernameExists = await User.findOne({username: username});

    if (usernameExists) {
        return res.send({message: 'Username already Exists!'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const NewUser = new User({
        email: email,
        username: username,
        password: hashed
    });

    try {
        const addedUser = await NewUser.save();
        return res.send({message: 'success'});
    } catch (e) {
        console.log(e);
    }

});
module.exports = RegisterRoute;