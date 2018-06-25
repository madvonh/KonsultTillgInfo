var firebase = require('firebase');
var config = require('../resources/secrets/firebase.config.json');

firebase.initializeApp(config);

module.exports = firebase;