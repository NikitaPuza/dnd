var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var algoliasearch = require('algoliasearch');
var hbs = require('hbs');

var client = algoliasearch('Y8Q3VSESJ3', 'f363abec573cdb3fbfdac0bf61135efc');
var index = client.initIndex('dnd_index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));


hbs.registerHelper('eachProperty', function(context, options) {
    var ret = "";
    for(var prop in context)
    {
        ret = ret + options.fn({property:prop,value:context[prop]});
    }
    return ret;
});

app.get('/', function(req, res) {
    index.getObjects(['Suki','Gimble','Fleo'], function (err, content) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {characters:content});
        }
    });
});

app.get('/:character',function(req, res) {
    index.getObject(req.params.character, function (err, content) {
        if (err) {
            console.log(err);
        } else {
            console.log(content);
            res.render('character', {character: content})
        }
    })
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
