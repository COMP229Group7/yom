// requiring modules
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

mongoose.de
let QuestionSchema = mongoose.Schema(
    {
        // surveyLink : {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref : 'Survey',
        // },
        qtype: String, 
        surveyQuestion: String,
        answersList: [{
            answer: {
                type: String
            }
        }], 
    },
    {
        collection: 'questions'
    }
);

module.exports.Question = mongoose.model('Question', QuestionSchema);