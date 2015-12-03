/*
 * File name: todos.js
 * Author's name: Emma Hilborn
 * Website name: http://emmavhilborn3.azurewebsites.net/
 * Description: This is the file that contains the routing for all "todos" views
 */

var express = require('express');
var passport = require('passport');
var router = express.Router();

var Todo = require('../models/todo.js');

//Wrap all processes in a function to ensure user is logged in
function requireAuth(req, res, next){

  //Check to ensure user is logged in, if not, redirect to login page
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  next();
}


//Creates a "todo" by "posting" to the json file
router.post('/', requireAuth, function(req, res, next){
   Todo.create(req.body, function(err, post){
      if(err){
        return next(err);}

      res.json(post);
   });
});

//Reads all "todos" by  finding them in the json file
router.get('/', requireAuth, function(req, res, next) {
  Todo.find(function(err,todos){
     if(err){return next(err);}
      res.json(todos);
  });
});

//Fetches a particular "todo" from the json file, based on the id
router.get('/:id', requireAuth, function(req,res, next) {
   Todo.findById(req.params.id, function(err,post){
      if(err) {
        return next(err);}
       res.json(post);
   });
});

//Updates a particular "todo" based on the id
router.put('/:id', requireAuth, function(req,res, next){
   Todo.findByIdAndUpdate(req.params.id, req.body, function(err, post){
      if(err) {return next(err);}
       res.json(post);
   }); 
});

//Deletes a particular "todo" based on the id
router.delete('/:id', requireAuth, function(req,res,next){
   Todo.findByIdAndRemove(req.params.id, req.body, function(err,post){
      if(err) {return next(err);}
       res.json(post);
   });
});


module.exports = router;
