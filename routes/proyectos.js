var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var proyecto = mongoose.model('Proyecto');

router.get('/get', function(req, res, next){
    proyecto.find(function(err, proyecto){
        if (err) { return next(err); }
        res.json(proyecto);
    })
});

router.post('/set', function(req, res, next){
    var nuevoProyecto = new proyecto(req.body);
    nuevoProyecto.save(function(err, nuevoProyecto){
        if (err){ return next(err); }
        res.redirect('/proyectos');
    })
});

router.get('/', function(req, res, next){
    proyecto.find()
    .populate('Proyecto')
    .exec(function(err, proyecto){
        if (err) { return next(err); }
        res.render('proyectos', { title: 'Proyectos!', model: proyecto });
    });
    
});

module.exports = router;