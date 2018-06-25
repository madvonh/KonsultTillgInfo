const express = require('express');
const router = express.Router();
const authService = require('../service/auth.service');

router.get('/login', function (req, res) {
    authService.getCurrentUser(req, res)
        .then(function (user) {
            if (user) {
                res.redirect('/');
            } else {
                res.render('login');
            }
        });
});

router.get('/login/reset', function (req, res) {
    res.render('login-reset');
});

router.post('/login', function (req, res) {
    if (!req.body) {
        res.redirect('/login');
    } else {
        authService.signInBasic(req.body.username, req.body.password)
            .then(function () {
                authService.createSessionCookie(res).then(function () {
                    // Set session expiration to 5 days.
                    // res.cookie('session', token, {maxAge: authService.expiresIn, httpOnly: true, secure: false, overwrite: true});
                    res.redirect('/');
                });
            })
            .catch(function () {
                res.redirect('/login');
            });
    }
});

router.post('/login/reset', function (req, res) {
    let email = req.body.email;
    authService.emailReset(email)
        .then(function () {
            res.redirect('/login?f=reset');
        })
        .catch(function () {
        });
});

router.post('/logout', function (req, res) {
    authService.signOut()
        .then(function () {
            res.setHeader('Cache-Control', 'private');
            res.clearCookie('__session', {overwrite: true});
            res.redirect('/login');
        })
        .catch(function () {
            res.redirect('/login');
        });
});

module.exports = router;