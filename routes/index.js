/*
 * File name: index.js
 * Author's name: Emma Hilborn
 * Website name: http://emmavhilborn2.azurewebsites.net/
 * Description: This is the file that contains the express routes for all my "index" views
 */

var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');

//Get home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home',
  displayName: req.user ? req.user.displayName : ''
   });
});

module.exports = router;

//Get about page
router.get('/about', function (req, res, next) {
    res.render('about',{ title: 'About',
    displayName: req.user ? req.user.displayName : ''
     });
});
module.exports = router;

//Get products page
router.get('/projects', function (req, res, next) {
    res.render('projects',{ title: 'Projects',
    displayName: req.user ? req.user.displayName : ''
     });
});
module.exports = router;

//Get services page
router.get('/services', function (req, res, next) {
    res.render('services',{ title: 'Services',
    displayName: req.user ? req.user.displayName : ''
     });
});
module.exports = router;

//Get contact page
router.get('/contact', function (req, res, next) {
    res.render('contact',{ title: 'Contact',
    displayName: req.user ? req.user.displayName : ''
     });
});
module.exports = router;

//Get login page
router.get('/login', function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/businessContacts');
    }
});

//Process the login
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/businessContacts',
    failureRedirect: '/login',
    failureFlash: true
}));

//Process logging out
router.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});

//Get registration page
router.get('/register', function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/');
    }
});

//Process registration data
router.post('/register', passport.authenticate('local-registration', {
    successRedirect : '/businessContacts',
    failureRedirect : '/register',
    failureFlash : true
}));

module.exports = router;


