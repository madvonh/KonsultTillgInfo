const {OAuth2Client} = require('google-auth-library');

const oauth2Client = new OAuth2Client(
    '828059772857-lte3uokmdlimivcl7io7cp4vo6qe8bu6.apps.googleusercontent.com',
    'PTswAcf05DR8l7uL2zl-Exbb',
    'http://localhost:8080/login/callback'
);

module.exports = oauth2Client;