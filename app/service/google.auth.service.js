let oauth2Client = require('../config/google.auth.config');

module.exports = {
    generateAuthUrl: function (callback) {
        let url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'profile email',
            prompt: 'select_account'
        });
        callback(url);
    },

    exchange: async function (code) {
        let {tokens} = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        return oauth2Client.credentials;
    },

    logout: function () {
        return oauth2Client.revokeCredentials()
            .catch(function (error) {
                console.log(error);
            });
    },

    user: function () {
        return oauth2Client.credentials;
    }
};