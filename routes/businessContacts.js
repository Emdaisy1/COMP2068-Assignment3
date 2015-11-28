/*
 * File name: businessContacts.js
 * Author's name: Emma Hilborn
 * Website name: http://emmavhilborn2.azurewebsites.net/
 * Description: This is the file that contains the express 
 * routes for all my "business contacts" views
 */

//Create variables to reference anything this page will use
var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/user');
var Contact = require('../models/businessContacts')

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
            Contact.find(function (err, contacts) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else{
            res.render('businessContacts/index', {
                title: 'Business Contacts',
                users: users,
                contacts:contacts,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    }).sort('name');
}
    });   
});

//Get the add page
router.get('/add', requireAuth, function (req, res, next) {
    Contact.find(function (err, contacts) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else{   
            res.render('businessContacts/add', {
                title: 'Add a Contact',
                contacts: contacts,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});

//Process adding a new contact
router.post('/add', requireAuth, function (req, res, next) {
    Contact.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    }, function (err, User) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businessContacts');
        }
    });
});

//Process deleting a contact
router.get('/delete/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    Contact.remove({ _id: id }, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businessContacts');
        }
    });
});

//Get the edit page
router.get('/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    Contact.findById(id, function (err, contact) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('businessContacts/edit', {
                title: 'Edit Contact',
                contact: contact,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});

//Process editing the contact
router.post('/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    var contact = new Contact(req.body);
    contact._id = id;
    Contact.update({ _id: id }, contact, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businessContacts');
        }
    });
});

module.exports = router;