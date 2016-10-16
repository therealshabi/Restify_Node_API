var helpers = require('../config/helperFunctions.js'); //Going one directory up then into config/helperFunction.js
var UserModel = require('../models/UserModel.js');
//Fake Database
/*var users = {};
var max_user_id = 0;*/


module.exports = function(server)
{
  //API call
  server.get("/",function(req,res,next){
    UserModel.find({}, function (err, users) {  //In {} braces we can add condition for obtaining data from our database similar to where clause
      if(err)
      {
        helpers.failure(res,next,err,404);
      }
      else{
      helpers.success(res,next,users);
      }
    });
  });

  server.get("/user/:id",function(req,res,next){
    req.assert('id','ID is required and must be numeric').notEmpty();//.isInt(); //Check for that id should not be empty and should be integer otherwise displays the message  (this function used from restify-validator)
    var errors = req.validationErrors();  //return boolean true if error is there
    if(errors)
    {
      helpers.failure(res,next,errors[0],400); //400 code for errors and errors[0] indicates 1st error
    }
    UserModel.findOne({_id: req.params.id}, function (err, user) {  //In {} braces we can add condition for obtaining data from our database similar to where clause
      if(err)
      {
        helpers.failure(res,next,"Something went wrong while fetching the user from database",500);
      }
      else if(user==null)
      {
        helpers.failure(res,next,"The Specified User can't be found",500);
      }
      else{
      helpers.success(res,next,user);
      }
    });
    /*if(req.params>max_user_id || typeof(users[parseInt(req.params.id)])=="undefined")
    {
      helpers.failure(res,next,"The specified user is not found in the database",404);
    }
    else{
    helpers.success(res,next,users[parseInt(req.params.id)]);
    //}*/
  });

  //Basically Insert Statement
  server.post("/user  ",function(req,res,next){
    req.assert('first_name','First name is required and should be valid String').notEmpty().isAlpha(); //Check for that id should not be empty and should be integer otherwise displays the message  (this function used from restify-validator)
    req.assert('last_name','Last name is required and should be valid String').notEmpty().isAlpha(); //Check for that id should not be empty and should be integer otherwise displays the message  (this function used from restify-validator)
    req.assert('Enrollment_no','Enrollment no. is required and must be numeric').notEmpty().isInt(); //Check for that id should not be empty and should be integer otherwise displays the message  (this function used from restify-validator)
    req.assert('career','Career should be either student, teacher or professor').isIn(['student','professor','teacher']); //Check for that id should not be empty and should be integer otherwise displays the message  (this function used from restify-validator)
    //For Email Validation we can use .isEmail() function

    var errors = req.validationErrors();  //return boolean true if error is there
    if(errors)
    {
      helpers.failure(res,next,errors,400); //400 code for errors
    }

    //For Fake Database
    /*var user = req.params;
    max_user_id++;  //Since a new user is added
    user.id = max_user_id;
    users[user.id]=user;*/

    //For Real Database
    var user = new UserModel();  //Creating an index of Model
    user.first_name = req.params.first_name;
    user.last_name = req.params.last_name;
    user.Enrollment_no = req.params.Enrollment_no;
    user.career = req.params.career;
    user.save(function(err){
      if(err){
      helpers.failure(res,next,'Error saving User to the database',500); //http_code = 500 means Internal Server Error
      }
      else
      {
        helpers.success(res,next,user);
      }
    }); //To Save this User in db
  });

  //Basically Updation of Existing Values
  server.put("/user/:id  ",function(req,res,next){
    req.assert('id','ID is required and must be numeric').notEmpty();//.isInt(); //Check for that id should not be empty and should be integer otherwise displays the message  (this function used from restify-validator)
    var errors = req.validationErrors();  //return boolean true if error is there
    if(errors)
    {
      helpers.failure(res,next,errors[0],400); //400 code for errors and errors[0] indicates 1st error
    }

    UserModel.findOne({_id: req.params.id}, function (err, user) {  //In {} braces we can add condition for obtaining data from our database similar to where clause
      if(err)
      {
        helpers.failure(res,next,"Something went wrong while fetching the user from database",500);
      }
      else if(user==null)
      {
        helpers.failure(res,next,"The Specified User can't be found",500);
      }
      else{
        var updates = req.params;
        delete updates.id;
        for (field in updates)
        {
           user[field]= updates[field];
        }
        user.save(function(err){
          if(err){
          helpers.failure(res,next,'Error saving User to the database',500); //http_code = 500 means Internal Server Error
          }
          else
          {
            helpers.success(res,next,user);
          }
        }); //To Save this User in db
      helpers.success(res,next,user);
      }
    });

    //helpers.success(res,next,user);
  });

  //Delete request
  server.del("/user/:id",function(req,res,next){
    req.assert('id','ID is required and must be numeric').notEmpty();//.isInt(); //Check for that id should not be empty and should be integer otherwise displays the message  (this function used from restify-validator)
    var errors = req.validationErrors();  //return boolean true if error is there
    if(errors)
    {
      helpers.failure(res,next,errors[0],400); //400 code for errors and errors[0] indicates 1st error
    }
    UserModel.findOne({_id: req.params.id}, function (err, user) {  //In {} braces we can add condition for obtaining data from our database similar to where clause
      if(err)
      {
        helpers.failure(res,next,"Something went wrong while fetching the user from database",500);
      }
      else if(user==null)
      {
        helpers.failure(res,next,"The Specified User can't be found",500);
      }
      else{
          user.remove(function(err){  //function to remove user
          if(err){
          helpers.failure(res,next,'Error Removing User from the database',500); //http_code = 500 means Internal Server Error
          }
          else
          {
            helpers.success(res,next,user);
          }
        }); //To Save this User in db
      }
    });
  });
}
