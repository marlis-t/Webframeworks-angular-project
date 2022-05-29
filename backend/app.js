var express = require('express');
const cors = require('cors');
const database = require('./database');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post('/login', function (req, res) {
  console.log(JSON.stringify(req.body));
  //console.log(req.body);
 
  const result = database.login(req.body.username, req.body.password);
  if (result !== null) {
    console.log(result); 
    res.status(201).json(result);
    
  } else {
    res.status(202).json(result);
  }

});

app.post('/signup', function (req, res) {
    console.log(JSON.stringify(req.body));
    const result = database.signup(req.body.username, req.body.password);
    if(result.success){
      res.status(201).json(result);
    }
    else{
      res.status(202).json(result);
    }
  });

module.exports = app;