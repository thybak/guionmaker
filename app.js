var express = require('express');

var mongoose = require("mongoose");
var usuariosModel = require('./models/Usuarios.js');
var clasificacionesModel = require('./models/Clasificaciones.js');
var generosModel = require('./models/Generos.js');
var proyectosModel = require('./models/Proyectos.js');
var detallesTecnicosModel = require('./models/DetallesTecnicos.js');
var detallesLiterariosModel = require('./models/DetallesLiterarios.js');
var escenasModel = require('./models/Escenas.js');

mongoose.connect("mongodb://192.168.1.135/guionMaker");

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var usuarios = require('./routes/usuarios');
var proyectos = require('./routes/proyectos');
var guiones = require('./routes/guiones');
var escenas = require('./routes/escenas');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/usuarios', usuarios);
app.use('/proyectos', proyectos);
app.use('/guiones', guiones);
app.use('/escenas', escenas);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(1337);

module.exports = app;
