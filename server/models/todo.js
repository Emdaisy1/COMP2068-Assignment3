/*
 * File name: businessContacts.js
 * Author's name: Emma Hilborn
 * Website name: http://emmavhilborn3.azurewebsites.net/
 * Description: This is the file that contains the schema for my business contacts model
 */

//Import mongoose
var mongoose = require('mongoose');
//To Do schema
var Schema = mongoose.Schema;
//Define the to do schema
var TodoSchema = new Schema({
	name: String,
	completed: Boolean,
	note: String,
	username: String,
	updated: {type: Date, default: Date.now}
}, {
	collection: 'todos' //Database collection name
});

module.exports = mongoose.model('Todo', TodoSchema);