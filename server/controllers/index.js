// Requiriing modules
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
    res.render('content/home', { title: 'Home', displayName: req.user? req.user.emailAddress: '' });
}

module.exports.displayTemplatePage = (req, res, next) => {
    res.render('content/template', { title: 'CreateSurvey', displayName: req.user? req.user.emailAddress: '' });
}

module.exports.displaySurvey1Page = (req, res, next) => {
    res.render('content/surveys/survey1', { title: 'Survey1', displayName: req.user? req.user.emailAddress: '' });
}

module.exports.displaySurvey2Page = (req, res, next) => {
    res.render('content/surveys/survey2', { title: 'Survey2', displayName: req.user? req.user.emailAddress: '' });
}

module.exports.displaySurvey3Page = (req, res, next) => {
    res.render('content/surveys/survey3', { title: 'Survey3', displayName: req.user? req.user.emailAddress: '' });
}

module.exports.displayLoginPage = (req, res, next) => {
    if (!req.user) {    // If user not logged in
        res.render('auth/login', 
        { 
            title: 'Login', 
            messages: req.flash('loginMessage'),
            displayName: req.user? req.user.displayName: ''
        });
    } else {            // If user already logged in
        return res.redirect('/users');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    console.log('process!!!!!!!!!');
    passport.authenticate('local',
    (err, user, info) => {
        if (err) {      // Server error
            return next(err);
        }
        if (!user) {        /// User login error
            req.flash('loginMessage', 'Authentication Error');
            // console.log('ERROR: ' + req.flash('loginMessage'));
            // console.log('length: ' + req.flash('loginMessage'))
            return res.redirect('/login');
        } 
        req.login(user, (err) => {
            if (err) {      // Server error
                return next(err);
            }
            return res.redirect('/template');
        })
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    if (!req.user) {
        res.render('auth/register', 
        { 
            title: 'Register', 
            messages: req.flash('RegisterMessage'),
            displayName: req.user? req.user.displayName: ''
        });
    } else {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    let newUser = User({
        username: req.body.emailAddress,
        emailAddress: req.body.emailAddress,
        contactName: req.body.contactName,
        contactNumber: req.body.contactNumber
    });
    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.error('ERROR: Inserting new user' + err);
            req.flash('RegisterMessage', err.message)
            res.render('auth/register', 
            { 
                title: 'Register', 
                messages: req.flash('RegisterMessage'),
                displayName: req.user? req.user.displayName: ''
            }); 
        } else{
            res.redirect('/login');
        }
    })
}

module.exports.performLogout = (req, res, next) => {
    req.logout();           // Performing logout
    return res.redirect('/');
}

// module.exports.processSurvey1Page = (req, res, next) => {

// }