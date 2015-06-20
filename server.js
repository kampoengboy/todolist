var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('todolist',['todolist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/todolist', function(req,res){
	
	db.todolist.find(function(err,docs){
		res.json(docs);
	});
	/*person1 = {
		name : 'Tim',
		email : 'tim@email.com',
		number : '111-111-111'
	};

	person2 = {
		name : 'Emily',
		email : 'emily@email.com',
		number : '111-111-222'
	};

	person3 = {
		name : 'Tomy',
		email : 'tomy@email.com',
		number : '111-111-333'
	}
	var contactlist = [person1,person2,person3];
	res.json(contactlist);*/
});

app.post('/todolist', function (req, res) {
  db.todolist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/todolist/:id', function (req, res) {
  var id = req.params.id;
  db.todolist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/', function (req, res) {
  res.render('index');
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
