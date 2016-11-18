var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var proyecto = mongoose.model('Escena');
var detalleLiterario = mongoose.model('DetalleLiterario');
var detalleTecnico = mongoose.model('DetalleTecnico');

router.get('', function (req, res, next) {
    // get genérico con el usuario logeado
});

module.exports = router;