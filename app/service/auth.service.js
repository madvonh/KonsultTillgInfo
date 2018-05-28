var firebase = require('../config/firebase.config');
const google = require('../service/google.auth.service');

module.exports = {
    getCurrentUser: function () {
        return firebase.auth().currentUser;
    },

    getAuthUrl: google.generateAuthUrl,

    signIn: function (authorizationCode) {
        let exchange = google.exchange(authorizationCode);
        return exchange
            .then(function (credentials) {
                if (credentials.id_token) {
                    let credential = firebase.auth.GoogleAuthProvider.credential(credentials.id_token);
                    return firebase.auth().signInAndRetrieveDataWithCredential(credential);
                } else {
                    return Promise.reject("Unable to fetch a valid id_token for the user.");
                }
            });
    },

    signOut: function () {
        return google.logout().then(function () {
            return firebase.auth().signOut();
        });
    }
}
;