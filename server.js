var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var multer  = require('multer')
var upload = multer({ dest: 'tmp/' })

app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(express.static(__dirname+"/public"))


/********************* Mongoose ***********************/
mongoose.connect('mongodb://127.0.0.1/ds')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log("we're connected to Mongo!")
})

/****             Schemas               ****/
var Show = require(__dirname+'/model/show')
/****             Schemas               ****/
/********************* Mongoose ***********************/

/******** ROUTER ********/

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html')
})

app.get('/shows', function(req, res){
	Show.find({}, function(err, shows) {
	  if (err) throw err
	  console.log("Obteniendo todos los shows desde: /shows")
	  res.json(shows)
	})
})

app.post('/shows', upload.single('img'), function(req, res, next){
	console.log(req.body)
	console.log(req)
	var show = new Show({
		nombreFantasia: req.body.nombreFantasia,
		fecha: req.body.fecha,
		img: {data: req.file, contentType: req.body.img},
		direccion: req.body.direccion,
		horario: req.body.horario,
		relatedImg: []
	})
	console.log("req.file: "+req.file)
 	console.log(req.file)
	show.save(function(err){
		if(err) console.log(err)
		console.log("Show "+show.nombreFantasia+" created successfully!")
	})
	res.sendFile(__dirname+"/index.html")
})

/******** ROUTER ********/


app.listen(8083, function () {
  console.log('Example app listening on port 8083!')
})
