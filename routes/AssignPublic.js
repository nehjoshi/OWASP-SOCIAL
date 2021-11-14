const express = require('express');
const router = express();
const UserSchema = require('../models/UserModel');
const PostSchema = require('../models/PostModel');
const mongoose = require('mongoose');

router.post('/user/:username/assign_public', async (req, res) => {
    const {username} = req.params;
    console.log(username);
    const {post, deadline, points} = req.body;
    const User = await mongoose.model('User', UserSchema);
    const Post = await mongoose.model('Post', PostSchema);
    const newPost = await Post.findOne({auth: "admin"});
    const user = await User.findOne({username: username});

    const PostData = {
        post: post,
        deadline: deadline,
        points: points,
        acceptedBy: []
    };
    const PostDataPublic = {
        author: username,
        post: post,
        deadline: deadline,
        points: points
    };

    user.workAssigned.push(PostData);
    newPost.posts.push(PostDataPublic);

    try {
        const savedUser = await user.save();
        const savedPost = await newPost.save();
        console.log('Saved!');
        return res.send({message: 'Success!'});
    } catch(e) {
        console.log('Error while saving: ' + e);
        return res.send({message: 'Error'});
    }
})
module.exports = router;