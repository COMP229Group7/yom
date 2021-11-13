let express = require('express');
const passport = require('passport');
let router = express.Router();
let userModel = require('../models/user');
let User = userModel.User;

function displayAllUsers(req, res, next) {
    User.find((err, userList) => {
        if (err) {
            console.log('ERROR');
        } else {
            // ************* Sorting by contact name ******************
            userList.sort((user1, user2) => user1.contactName.localeCompare(user2.contactName));
            res.render('./content/user/user', {title: 'List Users', UserList: userList, displayName: req.user? req.user.emailAddress: ''});
        }
    });
}

// To diplay all users
module.exports.diplayAllUsers = (req, res, next) => {
    displayAllUsers(req, res, next);
}

// To diplay add user page
module.exports.diplayAddPage = (req, res, next) => {
    res.render('auth/register', 
    { 
        title: 'Add User', 
        messages: req.flash('RegisterMessage'),
        displayName: req.user? req.user.displayName: ''
    });
}

// To process add user page.
module.exports.processAddPage = (req, res, next) => {
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
                title: 'Add User', 
                messages: req.flash('RegisterMessage'),
                displayName: req.user? req.user.displayName: ''
            }); 
        } else{
            res.redirect('/users');
        }
    })
}

// To diplay edit user page
module.exports.displayEditPage = (req, res, next) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
        console.log('ERROR');
        } else {
        res.render('content/user/user-edit', { title: 'Edit User', messages: req.flash('RegisterMessage'), User: user, displayName: req.user? req.user.emailAddress: '', id: req.params.id });
        }
    });
};

// To process edit user page
module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    let user = User({
        "_id": id,
        "username": req.body.emailAddress,
        "emailAddress": req.body.emailAddress,
        "contactName": req.body.contactName,
        "contactNumber": req.body.contactNumber
    });
    User.updateOne({"_id": id}, user, (err) => {
        if (err) {
            console.log(err);
            req.flash('RegisterMessage', req.body.emailAddress + " is already available as username.");
            res.render('content/user/user-edit', { title: 'Edit User', messages: req.flash('RegisterMessage'), User: user, displayName: req.user? req.user.emailAddress: '', id: req.params.id });
        } else {
            displayAllUsers(req, res, next);
        }
    });
}

// To remove user
module.exports.performDelete = (req, res, next) => {
    User.remove({'_id': req.params.id}, (err, user) => {
        if (err) {
          console.log('ERROR: ' + err);
        } else {
          return res.redirect('/users');
        }
    });
}