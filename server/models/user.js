/*
 * File name: user.js
 * Author's name: Emma Hilborn
 * Website name: http://emmavhilborn2.azurewebsites.net/
 * Description: This is the file that contains the schema for my user model
 */

//Import mongoose and bcrypt
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//Create alias for Mongoose schema
var Schema = mongoose.Schema;

//Define User Schema
var UserSchema = new Schema({
	username: String,
	password: String,
	email: String,
	displayName: String,
	salt: String
}, {
	collection: 'user' //Use this collection on the database connection
});

//Hash the password
UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);	
};

//Make sure password is valid
UserSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);	
};

module.exports = mongoose.model('User', UserSchema);