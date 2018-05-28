let firebase = require('firebase');
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBb9w2J5JwlXyIuDGhX60x49GfWhFv2aSI",
    authDomain: "konsultplanering.firebaseapp.com",
    databaseURL: "https://konsultplanering.firebaseio.com",
    projectId: "konsultplanering",
    storageBucket: "konsultplanering.appspot.com",
    messagingSenderId: "828059772857"
};
firebase.initializeApp(config);

module.exports = firebase;