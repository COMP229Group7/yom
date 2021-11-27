// Requiriing modules
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
const { Question } = require('../models/question');
const { Survey } = require('../models/survey');

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

module.exports.displaySurveyListPage= (req, res, next) => {
    // find all books in the books collection
    Survey.find( (err, surveys) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('content/list-survey', {
        title: 'Available Surveys', displayName: req.user? req.user.emailAddress: '', surveylist: surveys
      });
    }
  });
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

module.exports.processSurvey1Page = (req, res, next) => {
    console.log("In process survey : ", req.body.question1)
    let newQuestion1 = Question({
        surveyQuestion: req.body.question1,
        answersList: [
                        {answer: req.body.q1op1},
                        {answer: req.body.q1op2},
                        {answer: req.body.q1op3},
                        {answer: req.body.q1op4},
                        {answer: req.body.q1op5}
                    ]
    });
    let newQuestion2 = Question({
        surveyQuestion: req.body.question2,
        answersList: [
                        {answer: req.body.q2op1},
                        {answer: req.body.q2op2},
                        {answer: req.body.q2op3},
                        {answer: req.body.q2op4},
                        {answer: req.body.q2op5}
                    ]
    });
    console.log("Question object created");
    let newSurvey = Survey({
        questions: [newQuestion1, newQuestion2],
        active: true,
        // userId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User'
        // },
        title: req.body.surveytitle,
        description: "Coronavirus Leadership Check-in",
        template: "1"
    })
    console.log("Survey object created");
    // console.log(newQuestion);
    // newQuestion.answersList[0].option = req.body.q1op1;
    // newQuestion.answersList[1].option = req.body.q1op2;
    // console.log(newQuestion1);
    Question.create(newQuestion1, (err) => {
        if (err) {
            console.log("Error while creating question1 : " + err);
        //   } else {
        //     console.log("redirected")
        //     res.redirect('/template');
        //   }
        }
    });
    Question.create(newQuestion2, (err) => {
        if (err) {
            console.log("Error while creating question2 : " + err);
        //   } else {
        //     console.log("redirected")
        //     res.redirect('/template');
        //   }
        }
    });

    Survey.create(newSurvey, (err) => {
        
        if (err) {
            console.log("Error while creating survey : " + err);
          } else {
            console.log("Survey Created")
            console.log("redirected")
            res.redirect('/template');
          }
    });
}

module.exports.displayResponsePage = (req, res, next) => {
    console.log("in response page")
    id = req.params.id;
    Survey.findById(id, (err, survey) => {
        if (err) {
            console.log("Error while finding survey : " + err);
          } else {
            console.log("Survey Found")
            let questions = new Array();
            let count=0
            while (count<survey.questions.length) {
                console.log(survey.questions[count]._id)
                Question.findById("61a27791c6d7090f91332e86", (err, question) => {
                    if (err) {
                        console.log("Error while finding survey question : " + err);
                    } else { 
                        // console.log("Question: " + question)
                        questions[count] = question
                        // console.log("Questions: " + questions)
                    }
                })
                count++
            }
            console.log("questionstorespond: " + questions)
            // console.log("surveytorespond: " + survey)
            // console.log("sfsfdsdf")
            if (survey.template == "1") {
                res.render('content/responses/survey1', {title: 'Respond Survey', displayName: req.user? req.user.emailAddress: '', 
                                                    surveytorespond: survey, 
                                                    questionstorespond: questions});
            }
          }
    });
    
}