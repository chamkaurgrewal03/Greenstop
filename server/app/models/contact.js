var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ContactusSchema   = new Schema({
	name:String,
	company:String,
	phone:Number,
	email: String,
	subject:String,
	message:String
});

module.exports = mongoose.model('Contact', ContactusSchema);

