var express = require('express');
var reload = require('reload');
var app = express();
/*var dataFile = require('./data/data.json');*/

app.set('port', process.env.PORT || 8080 );
/*app.set('appData', dataFile);*/
app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(express.static('public'));
app.use(require('./routes/index'));

reload(app);

var server = app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
  });
  
