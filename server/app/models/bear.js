var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BearSchema   = new Schema({
	email: String,
	time: Date
});

module.exports = mongoose.model('Bear', BearSchema);