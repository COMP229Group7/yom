// Requiriing modules
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
const { Question } = require('../models/question');
const { Survey } = require('../models/survey');
const { Response } = require('../models/response');


let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
    res.render('content/home', { title: 'Home', displayName: req.user ? req.user.emailAddress : '' });
}

module.exports.displayTemplatePage = (req, res, next) => {
    res.render('content/template', { title: 'CreateSurvey', displayName: req.user ? req.user.emailAddress : '' });
}

module.exports.displaySurvey1Page = (req, res, next) => {
    res.render('content/surveys/survey1', { title: 'Survey1', displayName: req.user ? req.user.emailAddress : '' });
}

module.exports.displaySurvey2Page = (req, res, next) => {
    res.render('content/surveys/survey2', { title: 'Survey2', displayName: req.user ? req.user.emailAddress : '' });
}

module.exports.displaySurvey3Page = (req, res, next) => {
    res.render('content/surveys/survey3', { title: 'Survey3', displayName: req.user ? req.user.emailAddress : '' });
}

module.exports.displaySurveyListPage = (req, res, next) => {
    let date = Date.now();
    console.log(date)
    Survey.find( (err, surveys) => {
        if (err) {
            return console.error(err);
        }
        else {
            
            res.render('content/list-survey', {
                title: 'Available Surveys', displayName: req.user ? req.user.emailAddress : '', surveylist: surveys, dateNow:date
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
                displayName: req.user ? req.user.displayName : ''
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
                displayName: req.user ? req.user.displayName : ''
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
                    displayName: req.user ? req.user.displayName : ''
                });
        } else {
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
    console.log("In process survey 1: ", req.body.question1)
    let newQuestion1 = Question({
        surveyQuestion: req.body.question1,
        answersList: [
            { answer: req.body.q1op1 },
            { answer: req.body.q1op2 },
            { answer: req.body.q1op3 },
            { answer: req.body.q1op4 },
            { answer: req.body.q1op5 }
        ]
    });
    let newQuestion2 = Question({
        surveyQuestion: req.body.question2,
        answersList: [
            { answer: req.body.q2op1 },
            { answer: req.body.q2op2 },
            { answer: req.body.q2op3 },
            { answer: req.body.q2op4 },
            { answer: req.body.q2op5 }
        ]
    });
    let newQuestion3 = Question({
        surveyQuestion: req.body.question3,
        answersList: [
            { answer: req.body.q3op1 },
            { answer: req.body.q3op2 },
            { answer: req.body.q3op3 },
            { answer: req.body.q3op4 },
            { answer: req.body.q3op5 }
        ]
    });
    let newQuestion4 = Question({
        surveyQuestion: req.body.question4,
        answersList: [
            { answer: req.body.q4op1 },
            { answer: req.body.q4op2 },
            { answer: req.body.q4op3 },
            { answer: req.body.q4op4 },
            { answer: req.body.q4op5 }
        ]
    });
    let newQuestion5 = Question({
        surveyQuestion: req.body.question5,
        answersList: [
            { answer: req.body.q5op1 },
            { answer: req.body.q5op2 },
            { answer: req.body.q5op3 },
            { answer: req.body.q5op4 },
            { answer: req.body.q5op5 }
        ]
    });
    console.log("Question object created");
    let newSurvey = Survey({
        questions: [newQuestion1, newQuestion2, newQuestion3, newQuestion4, newQuestion5],
        active: true,
        startDate: req.body.surveyStartDate,
        endDate: req.body.surveyEndDate,
        userId: req.user,
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
    Question.create(newQuestion3, (err) => {
        if (err) {
            console.log("Error while creating question3 : " + err);
            //   } else {
            //     console.log("redirected")
            //     res.redirect('/template');
            //   }
        }
    });
    Question.create(newQuestion4, (err) => {
        if (err) {
            console.log("Error while creating question4 : " + err);
            //   } else {
            //     console.log("redirected")
            //     res.redirect('/template');
            //   }
        }
    });
    Question.create(newQuestion5, (err) => {
        if (err) {
            console.log("Error while creating question5 : " + err);
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
            console.log(req.user);
            res.redirect('/template');
        }
    });

}

module.exports.processSurvey2Page = (req, res, next) => {
    console.log("In process survey 2: ", req.body.question1)
    let newQuestion1 = Question({
        surveyQuestion: req.body.question1,
        answersList: [
            { answer: req.body.q1op1 },
            { answer: req.body.q1op2 }
        ]
    });
    let newQuestion2 = Question({
        surveyQuestion: req.body.question2,
        answersList: [
            { answer: req.body.q2op1 },
            { answer: req.body.q2op2 }
        ]
    });
    let newQuestion3 = Question({
        surveyQuestion: req.body.question3,
        answersList: [
            { answer: req.body.q3op1 },
            { answer: req.body.q3op2 }
        ]
    });

    console.log("Question object created");
    let newSurvey = Survey({
        questions: [newQuestion1, newQuestion2, newQuestion3],
        active: true,
        startDate: req.body.surveyStartDate,
        endDate: req.body.surveyEndDate,
        userId: req.user,
        title: req.body.surveytitle,
        description: "Customer Satisfaction Survey",
        template: "2"
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
    Question.create(newQuestion3, (err) => {
        if (err) {
            console.log("Error while creating question3 : " + err);
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
            console.log(req.user);
            res.redirect('/template');
        }
    });

}

module.exports.processSurvey3Page = (req, res, next) => {
    console.log("In process survey 3 : ", req.body.question1)
    let newQuestion1 = Question({
        surveyQuestion: req.body.question1,
        answersList: [
            { answer: req.body.q1op1 },
            { answer: req.body.q1op2 },
            { answer: req.body.q1op3 },
            { answer: req.body.q1op4 }, 
            { answer: req.body.q1op5 },
            { answer: req.body.q1op6 },
            { answer: req.body.q1op7 },
            
        ]
    });
    let newQuestion2 = Question({
        surveyQuestion: req.body.question2,
        answersList: [
            { answer: req.body.q2op1 },
            { answer: req.body.q2op2 },
            { answer: req.body.q2op3 },
            { answer: req.body.q2op4 },
            { answer: req.body.q2op5 },
            { answer: req.body.q2op6 },
            { answer: req.body.q2op7 },
        ]
    });
    // let newQuestion3 = Question({
    //     surveyQuestion: req.body.question3,
    //     answersList: [
    //         { answer: req.body.q3op1 },
    //         { answer: req.body.q3op2 }
    //     ]
    // });

    console.log("Question object created");
   
    let newSurvey = Survey({
        questions: [newQuestion1, newQuestion2],
        active: true,
        startDate: req.body.surveyStartDate,
        endDate: req.body.surveyEndDate,
        userId: req.user,
        title: req.body.surveytitle,
        description: "Customer Satisfaction Survey",
        template: "3"
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
    // Question.create(newQuestion3, (err) => {
    //     if (err) {
    //         console.log("Error while creating question3 : " + err);
    //         //   } else {
    //         //     console.log("redirected")
    //         //     res.redirect('/template');
    //         //   }
    //     }
    // });

    Survey.create(newSurvey, (err) => {

        if (err) {
            console.log("Error while creating survey : " + err);
        } else {
            console.log("Survey Created")
            console.log("redirected")
            console.log(req.user);
            res.redirect('/template');
        }
    });

}

module.exports.displayResponsePage = (req, res, next) => {
    console.log("in response page")
    id = req.params.id;
    let convertedIdList = [];
    Survey.findById(id, (err, survey) => {
        if (err) {
            console.log("Error while finding survey : " + err);
        } else {
            console.log("Survey Found")
            console.log(survey.questions)
            Question.find().where('_id').in(survey.questions).exec((err, questions) => {
                if (err) {
                    console.log("Error while finding survey question : " + err);

                } else {
                    console.log(questions)
                    console.log(typeof (questions));
                    if (survey.template == "1") {
                        res.render('content/responses/survey1', {
                            title: 'Survey Response', displayName: req.user ? req.user.emailAddress : '', surveytorespond: survey,
                            questiontorespond: questions
                        })
                    }
                    else if (survey.template == "2") {
                        res.render('content/responses/survey2', {
                            title: 'Survey Response', displayName: req.user ? req.user.emailAddress : '', surveytorespond: survey,
                            questiontorespond: questions
                        })
                    }
                    else if (survey.template == "3") {
                        res.render('content/responses/survey3', {
                            title: 'Survey Response', displayName: req.user ? req.user.emailAddress : '', surveytorespond: survey,
                            questiontorespond: questions
                        })
                    }
                }
            });

            // res.render('content/responses/survey1', {
            //     title: 'Respond Survey', displayName: req.user ? req.user.emailAddress : '',
            //     surveytorespond: survey
        }
    });
}


// module.exports.displayQuestionsPage = (req, res, next) => {
//     console.log("in questions page " + req.params.id)
//     id = req.params.id;
//     console.log(typeof (id));
//     let convertedIdList = id.split(",");
//     console.log(convertedIdList);

//     //  let questions = [];
//     // for (let count =0;count<convertedIdList.length; count++){
//     //     if (count == convertedIdList.length)
//     //     {console.log("In If")
//     //         // res.render('content/responses/questions',{title: 'Survey Question', displayName: req.user? req.user.emailAddress: '', 
//     //         //                      questiontorespond: questions,countQ:count}) 
//     //         after_loop();
//     //     }
//     //    else{
//     //     Question.findById(convertedIdList[count], (err, question) => {
//     //         if (err) {
//     //             console.log("Error while finding survey question : " + err);
//     //                 res.render('content/responses/questions',{title: 'Survey Question', displayName: req.user? req.user.emailAddress: '', 
//     //                              questiontorespond: questions,countQ:count}) 

//     //         } else { 
//     //             console.log(convertedIdList[count]);
//     //             questions[count]= question;   
//     //             console.log("Question Found" + questions[count]);                 

//     //         }

//     //     });
//     Question.find().where('_id').in(convertedIdList).exec((err, questions) => {
//         if (err) {
//             console.log("Error while finding survey question : " + err);


//         } else {
//             console.log(typeof (questions));
//             res.render('content/responses/questions', {
//                 title: 'Survey Question', displayName: req.user ? req.user.emailAddress : '',
//                 questiontorespond: questions, countQ: convertedIdList.length
//             })

//         }
//     });

// }

module.exports.processResponsePage = (req, res, next) => {
    console.log("In process response page: ", req.params)
    let answers = req.body.chosenAnswers;
    console.log(typeof (answers));
    console.log((answers));
    id = req.params.id;

    Survey.findById(id, (err, survey) => {
        if (err) {
            return console.error(err);
        }
        else {
            console.log("Survey Found");
            let newResponse = Response({
                surveyID: survey,
                chosenAnswersList: answers

            });
            console.log(newResponse);
            Response.create(newResponse, (err) => {

                if (err) {
                    console.log("Error while creating response : " + err);
                } else {
                    console.log("Response Created")
                    res.redirect('/list-survey');
                }
            });

        }
    });
}

module.exports.displayProfilePage = (req, res, next) => {
    console.log("In display profile page: ", req.params)
    Survey.find().where('userId').equals(req.user['_id']).exec((err, surveys) => {
        if (err) {
            console.log("Error while finding survey question : " + err);

        } else {
            console.log(surveys)
            res.render('content/user/profile', {
                title: 'Profile', displayName: req.user ? req.user.emailAddress : '', surveylist: surveys, dateNow:Date.now()

            })
        }
    });
}

module.exports.displayReportPage = (req, res, next) => {
    console.log("In display report page: ", req.user)
    Response.find().where('surveyID').equals(req.params.id).exec((err, responses) => {
        if (err) {
            console.log("Error while finding survey question : " + err);

        } else {
            console.log(responses)
            res.render('content/user/report', {
                title: 'Report', displayName: req.user ? req.user.emailAddress : '', responseslist: responses, 
                contactName: req.user ? req.user.contactName : ''

            })
        }
    });
}


module.exports.displaySurveyDetailsPage = (req, res, next) => {
    console.log("In display survey details page: ", req.params)
    Survey.find().where('_id').equals(req.params.id).exec((err, surveys) => {
        if (err) {
            console.log("Error while finding survey details : " + err);

        } else {
            console.log(surveys);
            res.render('content/user/survey-details', {
                title: 'Survey Details', displayName: req.user ? req.user.emailAddress : '', surveyDetails: surveys, dateNow: Date.now()

            })
        }
    });
}