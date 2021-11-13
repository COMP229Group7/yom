// requiring modules
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema(
    {
        username: 
        {
            type: String,
            default: '',
            trim: true,
            required: 'username is required'
        },
        // password: 
        // {
        //     type: String,
        //     default: '',
        //     trim: true,
        //     required: 'password is required'
        // },
        emailAddress: 
        {   type: String,
            default: '',
            trim: true,
            required: 'email address is required'
        },
        contactName: 
        {   type: String,
            default: '',
            trim: true,
            required: 'contact name is required'
        },
        contactNumber:
        {   type: String,
            default: '',
            trim: true,
            required: 'contact number is required'
        },
    },
    {
        collection: 'user'
    }
);

let options = ({missingPasswordError: 'Wrong or missing password'});
User.plugin(passportLocalMongoose, options);
module.exports.User = mongoose.model('User', User);