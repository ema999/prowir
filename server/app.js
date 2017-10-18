var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var env = require('./config/env.json');

var index = require('./routes/index');
var apiUserRouter = require('./api/entities/users/routes/userRouter');

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
app.use(express.static(path.join(__dirname, 'backoffice')));
app.use('/', index);
app.use('/api/user', apiUserRouter);

// Backoffice Routing
app.use('/backoffice', express.static(path.join(__dirname, '/backoffice')));
app.use('/assets', express.static(path.join(__dirname, '/backoffice')));
app.use('/backoffice/*', express.static(path.join(__dirname, '/backoffice')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Enviroment
var enviroment = process.env.ENVIROMENT || 'development';
var constantsEnv = env[enviroment];

// Mysql DB connection
conexionDB = mysql.createConnection({
  host: constantsEnv.DBHOST,
  user: constantsEnv.DBUSER,
  password: constantsEnv.DBPASSWORD,
  database: constantsEnv.DBNAME
});

conexionDB.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!");
});

module.exports = app;
