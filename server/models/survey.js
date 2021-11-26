// requiring modules
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let SurveySchema = mongoose.Schema({
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    active: Boolean,
    isPublic: {
        type: Boolean,
        default: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000)
    },
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    // type: {
    //     type: String,
    //     enum: ['1', '2', '3'],
    //     default: '2'
    // }
}, {
    collection: 'surveys'
});

module.exports.Survey = mongoose.model('Survey', SurveySchema);