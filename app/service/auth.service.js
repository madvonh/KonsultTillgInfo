var firebase = require('../config/firebase.config');
let admin = require('../config/firebase-admin.config');
let User = require('../models/user');

const hour = 60 * 60 * 1000;
const expiresIn = hour * 12;

module.exports = {

    getCurrentUser: function (req, res) {
        let idToken = req.cookies.__session;
        if (idToken) {
            return admin.auth().verifySessionCookie(idToken, false)
                .then(function (token) {
                    // If less than an hour left on the session token, refresh.
                    if (firebase.auth().currentUser && ((token.exp * 1000) - hour) < new Date().getTime()) {
                        return firebase.auth().currentUser.getIdTokenResult(true).then(function (newToken) {
                            return admin.auth().createSessionCookie(newToken.token, {expiresIn}).then(function (session) {
                                createCookie(res, session);
                                return toUser(newToken.claims);
                            });
                        });
                    } else {
                        return toUser(token);
                    }

                }).catch(function (err) {
                    console.log(err);
                    return Promise.resolve(null);
                });
        } else {
            return Promise.resolve(null);
        }
    },

    signInBasic: function (username, password) {
        return firebase.auth().signInWithEmailAndPassword(username, password);
    },

    emailReset: function (email) {
        return firebase.auth().sendPasswordResetEmail(email);
    },

    signOut: function () {
        return firebase.auth().signOut();
    },

    createSessionCookie: function (res) {
        return firebase.auth().currentUser.getIdToken(true).then(function (token) {
            return admin.auth().createSessionCookie(token, {expiresIn}).then(function (session) {
                createCookie(res, session);
            });
        });
    },

    expiresIn: expiresIn
};

function createCookie(res, token) {
    res.setHeader('Cache-Control', 'private');
    res.cookie('__session', token, {
        maxAge: expiresIn,
        httpOnly: true,
        secure: false,
        overwrite: true
    });
}

function toUser(token) {
    return new User(token.name, token.email, token.role);
}
