const express = require('express');
const router = express.Router();
const authService = require('../service/auth.service');
const adminService = require('../service/admin.service');

router.get('/admin', function (req, res) {
    doAsAdmin(req, res, function (user) {
        adminService.getUsers().then(function (users) {
            res.render('admin', {
                users: users,
                user: user
            });
        });
    });
});

router.post('/admin/role', function (req, res) {
    doAsAdmin(req, res, function () {
        let userId = req.body.userId;
        let role = req.body.role;
        adminService.setRole(userId, role).then(function () {
            res.redirect('/admin');
        });
    });
});

router.post('/admin/create', function (req, res) {
    doAsAdmin(req, res, function () {
        let name = req.body.displayName;
        let email = req.body.email;
        adminService.create(name, email).then(function () {
            res.redirect('/admin');
        });
    });
});

router.post('/admin/delete', function (req, res) {
    doAsAdmin(req, res, function () {
        let userId = req.body.userId;
        adminService.delete(userId).then(function () {
            res.redirect('/admin');
        });
    });
});

function doAsAdmin(req, res, action) {
    authService.getCurrentUser(req, res).then(function (user) {
        if (!user) {
            res.redirect('/login');
        } else if (user.isAdmin()) {
            action(user);
        } else {
            res.redirect('/?unauthorized=true');
        }
    });
}

module.exports = router;