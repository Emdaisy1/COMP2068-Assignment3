/*
 * File name: users.js
 * Author's name: Emma Hilborn
 * Website name: http://emmavhilborn2.azurewebsites.net/
 * Description: This is the file that contains the express routes for the "users" view
 */

//Create variables to reference anything this page will use
var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/user');

//Create function to check if user is logged in or not (redirect them to login if not)
function requireAuth(req, res, next){
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  next();
}

//Ensure user is logged in, and if so, load the users
router.get('/', requireAuth, function (req, res, next) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('users/index', {
                title: 'Users',
                users: users,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});

module.exports = router;
