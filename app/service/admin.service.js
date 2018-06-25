let admin = require('../config/firebase-admin.config');

module.exports = {

    getUsers: function() {
        return admin.auth().listUsers(50)
            .then(function (listUsersResult) {
                return listUsersResult.users;
            });
    },

    setRole: function (userId, role) {
        return admin.auth().setCustomUserClaims(userId, {role: role});
    },

    create: function (name, email) {
        return admin.auth().createUser({
            email: email,
            displayName: name,
            disabled: false
        });
    },

    delete: function (userId) {
        return admin.auth().deleteUser(userId);
    }
};