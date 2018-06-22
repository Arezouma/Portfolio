var express = require('express');
var app = express();
var port = 3030;
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');



//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true })); 

var sequelize = new Sequelize('postgres://postgres:Fechal75@localhost/portfolio');
//var sequelize = new Sequelize('pos');
var Review = sequelize.define('review',{
	name: Sequelize.STRING,
	email: Sequelize.STRING,
	comments: Sequelize.STRING,
	survey: Sequelize.BOOLEAN
});
Review.sync().then(function() {
	
})


app.set('view engine','ejs');
app.use(express.static('public'));
app.get('/', function(req,res) {
	res.render('index');
});
app.get('/blog', function(req,res) {
	res.render('blog');
});

var data;

app.post('/submit', function(req,res){
	Review.create({
		name: req.body.fname,
		email: req.body.email,
		comments: req.body.comments,
		survey: req.body.survey
	}).then(function(item){
		res.redirect('review');
	});
});

app.get('/review',function(req,res){
	Review.findAll().then(function(rows){
		data = rows;
		res.render('review',{
			data: data
		});
	});
	
});
app.get('/project',function(req,res){
	res.render('project');
});



app.listen(port);
console.log('listening on port 3030');
