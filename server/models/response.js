// requiring modules
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let ResponseSchema = mongoose.Schema({
    questionValue: [String],
    survey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Survey'
    },
    // ownerId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }
}, {
    collection: 'responses'
});

module.exports.Response = mongoose.model('Response', ResponseSchema);