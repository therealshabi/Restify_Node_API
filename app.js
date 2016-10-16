var restify = require('restify');
var server = restify.createServer();
var mongoose = require('mongoose');
//mongoose.Promise = global.Promise;
var config = require('./config/dbConnection.js');
mongoose.connect(config.getMongoConnection());
var setupController = require('./controllers/setupController.js');
var userController = require('./controllers/userController.js');
var restifyValidator = require('restify-validator');

setupController(server,restify,restifyValidator); //Function created in controllers/setipcontroller.js
userController(server); //Function created in controllers/usercontroller.js


//params req means request, res means response and next
/*function respond(req, res, next) {
 res.send('hahahahah ' + req.params.name);  //req.params.name basically has name passes in the url because of :name in server
 next();
}

var server = restify.createServer();
server.get('/myget/:name', respond);  //Handles get request, check for URL type :- /hello/:name and then calls respond function
server.post('/mypost/:name', respond);*/

server.listen(8080, function() {
 console.log('%s listening at %s', server.name, server.url);
});
