const express = require('express');
const router = express.Router();
var consultsspreadsheet = require('../models/consultspreadsheet');

router.get('/', function(req, res) {
  getConsults = require('../facade/googlespreadsheet');
  getConsults (function (result) {
    var cons = result;

    var users =[];
    users.push('madeleine.von.hausswolff@webstep.se')

    res.render('index', {
      pageTitle: 'Konsulter',
      consultsinfo: cons,
      authorized: users
    });
  });
});

module.exports = router;