var mongoose = require('mongoose');

var GeneroSchema = new mongoose.Schema({
    nombre: String
}); 

mongoose.model('Genero', GeneroSchema);