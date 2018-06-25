const app = require('./config/app.config');
const functions = require('firebase-functions');

app.set('views', './views');

exports.app = functions.https.onRequest(app);