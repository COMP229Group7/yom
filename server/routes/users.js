/**
 * users.js
 * Austin Joyal
 * 301200483
 * Oct 3, 2021
 */

var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let userModel = require('../models/user');
let User = userModel.User;
let userController = require('../controllers/users')

// Function to redirect user to login if he tries to access secure area.
function requireAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}
/* GET users listing. */
router.get('/', userController.diplayAllUsers);

/* GET ADD user */
router.get('/add', requireAuth, userController.diplayAddPage);

/* POST ADD user */
router.post('/add', requireAuth, userController.processAddPage);

/* GET EDIT users listing. */
router.get('/edit/:id', requireAuth, userController.displayEditPage);

/* POST EDIT users listing. */
router.post('/edit/:id', requireAuth, userController.processEditPage);

/* DELETE users listing. */
router.get('/delete/:id', requireAuth, userController.performDelete);

module.exports = router;
