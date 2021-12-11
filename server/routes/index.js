
let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index')

// Function to redirect user to login if he tries to access secure area.
function requireAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}


/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET template page. */
router.get('/template', requireAuth, indexController.displayTemplatePage);

router.get('/survey1', indexController.displaySurvey1Page);

router.post('/survey1', indexController.processSurvey1Page);


router.get('/survey2', indexController.displaySurvey2Page);
router.post('/survey2', indexController.processSurvey2Page);

router.get('/survey3', indexController.displaySurvey3Page);
router.post('/survey3', indexController.processSurvey3Page);

/* GET login page. */
router.get('/login', indexController.displayLoginPage);

/* POST login page. */
router.post('/login', indexController.processLoginPage);

/* GET register page. */
router.get('/register', indexController.displayRegisterPage);

/* POST register page. */
router.post('/register', indexController.processRegisterPage);

/* GET logout page. */
router.get('/logout', indexController.performLogout);

router.get('/profile', indexController.displayProfilePage);

router.get('/list-survey', indexController.displaySurveyListPage);

router.get('/survey-response/:id', indexController.displayResponsePage);

// router.get('/survey-questions/:id',indexController.displayQuestionsPage);
router.post('/survey-response/:id', indexController.processResponsePage);

/* GET register page. */
router.get('/report/:id', indexController.displayReportPage);

/* GET register page. */
router.get('/survey-details/:id', indexController.displaySurveyDetailsPage);

module.exports = router;
