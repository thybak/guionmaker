var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var proyecto = mongoose.model('Proyecto');

router.get('/get', function(req, res, next){
    proyecto.find(function(err, proyecto){
        if (err) { return next(err); }
        res.json(proyecto);
    });
});

router.post('/set', function(req, res, next){
    var nuevoProyecto = new proyecto(req.body);
    nuevoProyecto.save(function(err, nuevoProyecto){
        if (err){ return next(err); }
        res.redirect('/proyectos');
    });
});

router.get('/', function(req, res, next){
    proyecto.find()
    .populate('Proyecto')
    .exec(function(err, proyecto){
        if (err) { return next(err); }
        res.render('proyectos/listaProyectos', { title: 'Listado de proyectos | GuionMaker', model: proyecto });
    });
});

router.get('/portada/:proyectoId', function (req, res, next) {
    if (req.params.proyectoId) {
        proyecto.findById(req.params.proyectoId)
            .exec(function (err, _proyecto) {
                res.render('proyectos/detalleProyecto', {
                title: _proyecto.nombre + ' | Proyectos | GuionMaker', model: _proyecto
            });
        });   
    }
});

module.exports = router;