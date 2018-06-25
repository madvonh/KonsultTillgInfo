var express = require('express');
var engines = require('consolidate');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();
app.engine('ejs', engines.ejs);
app.set('views', 'app/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('app/public'));

app.use(require('../routes/index.route'));
app.use(require('../routes/auth.route'));
app.use(require('../routes/admin.route'));

app.get('*', function (req, res) {
    res.redirect('/');
});

module.exports = app;