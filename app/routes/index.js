const express = require('express');
const router = express.Router();
var consultsspreadsheet = require('../models/consultspreadsheet');

router.get('/', function(req, res) {
  getConsults = require('../facade/googlespreadsheet');
  getConsults (function (result) {
    var cons = result;
   // console.log(cons);
    // process the async result
    res.render('index', {
      pageTitle: 'Konsulter',
      consultsinfo: cons
    /*artwork: pagePhotos,
      speakers: pageSpeakers,
      pageID: 'home'*/
    });
  });
});

module.exports = router;