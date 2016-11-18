var mongoose = require('mongoose');

var DetalleLiterarioSchema = new mongoose.Schema({
    texto: String
});

mongoose.model('DetalleLiterario', DetalleLiterarioSchema);