var admin = require('firebase-admin');

var serviceAccount = require('../resources/secrets/firebase.admin.config.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://konsultplanering.firebaseio.com'
});

module.exports = admin;