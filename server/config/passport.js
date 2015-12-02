/*
 * File name: passport.js
 * Author's name: Emma Hilborn
 * Website name: http://emmavhilborn3.azurewebsites.net/
 * Description: Sets up the passport strategy
 */

//Reference the passport strategy
var LocalStrategy = require('passport-local').Strategy;
//Import the User Model
var User = require('../models/user');
module.exports = function (passport) {
    //Serialize user
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    //Deserialze user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
    passport.use('local-login', new LocalStrategy({
        passReqToCallback: true
    }, function (req, username, password, done) {
        // asynchronous process
        process.nextTick(function () {
            User.findOne({
                'username': username
            }, function (err, user) {
                //Send error for invalid username or password - if no errors, log in
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'Incorrect Username'));
                }
                if (!user.validPassword(password)) {
                    return done(null, false, req.flash('loginMessage', 'Incorrect Password'));
                }
                return done(null, user);
            });
        });
    }));
    //Set up local registration strategy
    passport.use('local-registration', new LocalStrategy({
        passReqToCallback: true
    }, function (req, username, password, done) {
        process.nextTick(function () {
            if (!req.user) {
                User.findOne({ 'username': username }, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    //Make sure username isn't taken
                    if (user) {
                        return done(null, false, req.flash('registerMessage', 'The username is already taken'));
                    }
                    else {
                        //If no issues, create the user
                        var newUser = new User(req.body);
                        newUser.password = newUser.generateHash(newUser.password);
                        newUser.provider = 'local';
                        newUser.created = Date.now();
                        newUser.updated = Date.now();
                        newUser.save(function (err) {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser);
                        });
                    }
                });
            }
            else {
                //If everything is okay, register the user
                return done(null, req.user);
            }
        });
    }));
};