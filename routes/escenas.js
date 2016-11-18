var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var escena = mongoose.model('Escena');

router.get('/', function (req, res, next) {
    res.render('escenas/listaEscenas', { title: 'Lista de escenas | Gestión de proyectos | GuionMaker' });
});

module.exports = router;