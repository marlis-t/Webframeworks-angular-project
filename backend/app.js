var express = require('express');
const cors = require('cors');
const database = require('./database');
//ue2 w.o those 2
const UserData = require('./user-data');
const mongoose = require('mongoose');
//
var randomToken = require('random-token');

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//ue2 w.o. this one
mongoose.connect('mymongodblink');

app.post('/login', function (req, res) {
  UserData.find({username: req.body.username, password: req.body.password}).then((foundData) => {
    if(foundData.length > 0) {
      console.log("Logged in with Information: " + foundData);
      const result = {
        token: randomToken(64),
        username: req.body.username,
        msg: "Login successful"
      }
      res.status(202).json(result);
    }
    else{
      res.status(202).json(null);
    }
  });  

});

app.post('/signup', function (req, res) {
  UserData.find({username: req.body.username}).then((foundData) => {
    if(foundData.length > 0) {
      const result = {
        token: null,
        username: req.body.username,
        success: false,
        msg: "A User with this username already exists"
      }
      res.status(202).json(result);
    }
    else{
      const thisUserData = new UserData({username: req.body.username, password: req.body.password});
      thisUserData.save().then(() => {
        const result = {
          token: randomToken(64),
          username: req.body.username,
          success: true,
          msg: "Sign-up successful"
        }
        console.log("Added User with Information: " + thisUserData);
        res.status(202).json(result);
      });
    }
  });
});

module.exports = app;

//sign up
/*
app.post('/signup', function (req, res) {
  console.log(JSON.stringify(req.body));
  const result = database.signup(req.body.username, req.body.password);
  if(result.success){
    res.status(201).json(result);
  }
  else{
    res.status(202).json(result);
  }
}
*/

//log in
/*
app.post('/login', function (req, res) {
  const result = database.login(req.body.username, req.body.password);
  if (result !== null) {
    console.log(result); 
    res.status(201).json(result); 
  } 
  else {
    res.status(202).json(result);
  }
}
  */
