const express = require('express');
const router = express();
const UserSchema = require('../models/UserModel');
const mongoose = require('mongoose');

router.post('/user/:username/accept_work', async (req, res) => {
    const { username } = req.params;
    const { post, author, deadline, points } = req.body;
    const User = await mongoose.model('User', UserSchema);
    const AnotherUser = await mongoose.model('User', UserSchema);

    const receiverUser = await User.findOne({ username: username });
    const authorUser = await AnotherUser.findOne({ username: author });

    const toReceiver = {
        post: post,
        author: author,
        deadline: deadline,
        points: points,
        isCompleted: false
    };
    authorUser.workAssigned[0].acceptedBy.push({username: receiverUser.username, isCompleted: false})
    receiverUser.workPending.push(toReceiver);
    
  

    try {
        const savedAuthor = await authorUser.save();
        const savedUser =  await receiverUser.save();
        
        return res.send({message: 'Accepted!'});
    } catch(e){
        console.log(e);
    }




});
module.exports = router;