/*
* File name: app.js
* Author's name: Emma Hilborn
* Website name: http://emmavhilborn3.azurewebsites.net/
* Description: This file configures all dependencies, etc for the page/application -->
*/

//Set up all the application's modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Additions for authentication
var session = require('express-session');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');

//Add database setup
var DB = require('./server/config/db.js');
mongoose.connect(DB.url);
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Failed...');
});

var routes = require('./server/routes/index');
var users = require('./server/routes/users');
var businessContacts = require('./server/routes/businessContacts');
var todos = require('./server/routes/toDoList');

var app = express();

require('./server/config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Set up Session object
app.use(session({
  secret: 'randomSecret',
  saveUninitialized: true,
  resave: true
}));

//Add in connection to Passport and Flash and configure them
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/businessContacts', businessContacts);
app.use('/toDoList', todos);


//Catch 404 errors and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// Error handlers

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




module.exports = app;
