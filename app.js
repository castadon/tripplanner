var express = require("express");
var bodyParser = require("body-parser");
var swig= require ("swig");
var logger = require("morgan")("dev");
var path = require('path');
var sass = require('node-sass-middleware');

//set up routes
var routes = require('./routes/index');

var app = express(); //set up app we will be using

// view engine setup
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

//SASS middleware
app.use(
  sass({
    src: __dirname + '/assets', //where the sass files are 
    dest: __dirname + '/public', //where css should go
    debug: true
  })
);

app.use(logger); //enable logging
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/bower_components", express.static(path.join(__dirname, 'bower_components')));

app.listen(3000, function(){
     console.log("Starting Server! Listening on port 3000...");
});

app.use('/', routes); //set up initial route for root

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
  swig.setDefaults({ cache: false });
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