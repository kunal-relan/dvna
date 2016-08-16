var express = require('express');
var app = express();
var mongoose = require('mongoose');
require('./user.js');
var  User =  mongoose.model('User');
var sanitize = require('mongo-sanitize');
var bodyParser = require('body-parser');


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
mongoose.connect('mongodb://localhost/dvna');

app.get('/', function (req, res) {
  res.send('Hello Express!');
});

app.post('/signup', function (req, res) {

  var newUser = new User(req.body);
  newUser.save(function(err,data){
  	if(err){
  		res.send(err);
  	}else{
  		res.send('User Registered');
  	}
  })
});

app.post('/login',function(req,res){
	var email = sanitize(req.body.email);
	var password = sanitize(req.body.password);
	User.findOne({'email': { $in: [email] },'password': { $in: [password] }},function(err,data){

		if(err){
			res.send(err);
		}else if(data){
			res.send('User Login Successful');
		}else {
			res.send('Wrong Username Password Combination');
		}
	})
});

app.listen(3000, function () {
  console.log('Express app listening on port 3000!');
});