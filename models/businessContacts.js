/*
 * File name: businessContacts.js
 * Author's name: Emma Hilborn
 * Website name: http://emmavhilborn2.azurewebsites.net/
 * Description: This is the file that contains the schema for my business contacts model
 */

//Import mongoose and bcrypt
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//Create alias for Mongoose schema
var Schema = mongoose.Schema;

//Define User Schema
var ContactSchema = new Schema({
	name: String,
	email: String,
	phone: String
}, {
	collection: 'contacts' //Use this collection on the database connection
});

module.exports = mongoose.model('Contact', ContactSchema);