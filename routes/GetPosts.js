const express = require('express');
const router = express();
const PostSchema = require('../models/PostModel');
const mongoose = require('mongoose');

router.get('/user/:username/public_posts', async (req, res) => {
    const Posts = await mongoose.model('Posts', PostSchema);
    const posts = await Posts.findOne({auth: 'admin'});

    const allPosts = posts.posts;
    return res.send({posts: allPosts});
});
module.exports = router;
