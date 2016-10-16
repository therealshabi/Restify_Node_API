//Anonymous Function (without name)
module.exports = function(server,restify,restifyValidator)
{
  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.bodyParser());  //Extract the parameters using res.params without the use of writing URL for each parameter
  server.use(restify.queryParser());
  server.use(restifyValidator);
}
