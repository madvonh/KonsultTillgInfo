var app = require('./config/app.config');
var reload = require('reload');

app.set('port', process.env.PORT || 8080);

reload(app);

app.listen(app.get('port'), function () {
    console.log('Listening on port ' + app.get('port'));
});