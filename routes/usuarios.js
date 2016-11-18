var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var usuario = mongoose.model('Usuario');

router.get('/', function (req, res, next) {
    usuario.find().exec(function (err, usuarios) {
        res.json(usuarios);
    });
});

router.post('/set', function (req, res, next) {
    console.log(req.body);
    var _usuario = new usuario(req.body);
    _usuario.save(function (err, _usuario) {
        if (err) return next(err);
        res.redirect('/usuarios');
    });
});


module.exports = router;
