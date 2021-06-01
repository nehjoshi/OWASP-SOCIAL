const express = require('express');
const router = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schema = require('../models/UserModel');

router.post('/user/:username/update', async (req, res) => {
    const { username, password, newPassword } = req.body;

    const User = await mongoose.model('User', schema);
    const user = await User.findOne({ username: username });

    const verify = await bcrypt.compare(password, user.password);
    if (!verify) return res.send({ message: 'Incorrect Password' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newPassword, salt);

    
    user.password = hashed;

    try {
        const saved = await user.save()
        return res.send({message: "Password Updated Successfully"});
    } catch(e) {
        console.log(e);
    }

});
module.exports = router;