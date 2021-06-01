const express = require('express');
const router = express();
const UserSchema = require('../models/UserModel');
const PostSchema = require('../models/PostModel');
const mongoose = require('mongoose');

router.get('/user/:username/get_pending', async (req, res) => {
    const {username} = req.params;
    const User = await mongoose.model('User', UserSchema);
    const user = await User.findOne({username: username});

    const workPending = user.workPending;

    return res.send({workPending: workPending});
});
module.exports = router;