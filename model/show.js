var mongoose = require('mongoose')
var Schema = mongoose.Schema

var showSchema = new Schema({
	nombreFantasia: String,
	fecha: Date,
	img: { data: Buffer, contentType: String },
	direccion: String,
	horario: Date,
	relatedImg: [{data: Buffer, contentType: String}]
})


var Show = mongoose.model('Show', showSchema)

module.exports = Show