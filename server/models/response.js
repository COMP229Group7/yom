// requiring modules
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let ResponseSchema = mongoose.Schema({

    surveyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Survey'
    },
    chosenAnswersList: [{

        type: String

    }],
},
    {
        collection: 'responses'
    });

module.exports.Response = mongoose.model('Response', ResponseSchema);