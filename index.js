const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const RegisterRoute = require('./routes/RegisterRoute');
const LoginRoute = require('./routes/LoginRoute');
const DashboardRoute = require('./routes/DashboardRoute');
const UpdatePwd = require('./routes/UpdatePwd');
const AssignPublic = require('./routes/AssignPublic');
const GetPosts = require('./routes/GetPosts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const AcceptWork = require('./routes/AcceptWork');
const GetPending = require('./routes/GetPending');
dotenv.config();

var corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']        //Setting CORS
}
app.use(bodyParser.urlencoded({extended: true}));   //Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions))
app.use('/', RegisterRoute);
app.use('/', LoginRoute);
app.use('/', DashboardRoute);
app.use('/', UpdatePwd);
app.use('/', AssignPublic);
app.use('/', GetPosts);
app.use('/', AcceptWork);
app.use('/', GetPending);

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Authentication successful");
})
.catch(() => {
    console.log("Error while connecting to MongoDB!!");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running!");      //Listening
})