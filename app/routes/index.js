const express = require('express');
const router = express.Router();
var consultsspreadsheet = require('../models/consultspreadsheet');
var firebase = require('../config/firebase.config');
const google = require('../service/google.auth.service');
const authService = require('../service/auth.service');

router.get('/', function (req, res) {
    console.log("GET: /");
    let currentUser = authService.getCurrentUser();
    if (currentUser) {
        getConsults = require('../facade/googlespreadsheet');
        getConsults(function (result) {
            var cons = result;

            var users = [];
            users.push('madeleine.von.hausswolff@webstep.se');

            res.render('index', {
                pageTitle: 'Konsulter',
                consultsinfo: cons,
                authorized: users,
                user: {
                    name: currentUser.displayName,
                    email: currentUser.email,
                    photoUrl: currentUser.photoURL,

                }
            });
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/login', function (req, res) {
    console.log('GET: /login');
    let currentUser = authService.getCurrentUser();
    if (currentUser) {
        res.redirect('/');
    } else {
        authService.getAuthUrl(function (url) {
            res.render('login', {
                url: url
            });
        });
    }
});

router.get('/login/callback', function (req, res) {
    console.log('GET: /login/callback');
    authService.signIn(req.query.code)
        .then(function (user) {
            res.redirect('/');
        })
        .catch(function (error) {
            console.log(error);
            res.redirect('/login');
        });
});

router.post('/logout', function (req, res) {
    console.log("POST: /logout");
    authService.signOut()
        .then(function () {
            res.redirect('/login');
        })
        .catch(function (error) {
            console.log(error);
            res.redirect('/login');
        });
});

module.exports = router;