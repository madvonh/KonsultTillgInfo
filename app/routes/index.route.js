const express = require('express');
const router = express.Router();
const authService = require('../service/auth.service');

router.get('/', function (req, res) {
    authService.getCurrentUser(req, res)
        .then(function (user) {
            if (!user) {
                res.redirect('/login');
            } else {
                let getConsults = require('../service/consultant.service');
                getConsults(function (consultants) {

                    res.render('index', {
                        pageTitle: 'Konsulter',
                        consultants: consultants,
                        unauthorized: req.query && req.query.unauthorized,
                        user: {
                            name: user.name,
                            email: user.email,
                            role: user.role
                        }
                    });
                });
            }
        });
});

module.exports = router;