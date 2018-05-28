var express = require('express');
var reload = require('reload');
var bodyParser = require('body-parser');
var app = express();
/*var dataFile = require('./data/data.json');*/

app.set('port', process.env.PORT || 8080 );
/*app.set('appData', dataFile);*/
app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('app/public'));
app.use(require('./routes/index'));

reload(app);

var server = app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
  });
  
