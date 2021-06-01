const express = require('express');
const DashboardRoute = express();
const VerifyToken = require('./VerifyToken');


DashboardRoute.post('/user/:username', VerifyToken, (req, res) => {
    return res.send({message: `Well done ${req.params.username}, you are signed in!`});
})
module.exports = DashboardRoute;