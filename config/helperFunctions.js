//For redundant codes in api calls
// _respond means private function
function _respond(res,next,status,data,http_code){   //here status is either success or failure, data can be any data and http_code can be eg 200 for success, 404 for page not found etc.
 var response = {
   'status' : status,
   'data' : data
 };
 res.setHeader('content-type','application/json'); // Specifying return content-type will be in JSON format
 res.writeHead(http_code);  //Return the header or write the header; 200 means HTTP response successful
 res.end(JSON.stringify(response)); //Creates JSON response string
 return next();  //Go to next part of executionvif it exists
}

//on success this will be called
module.exports.success = function(res,next,data){
_respond(res,next,'success',data,200); //status set to success
}

//on failure this will be called
module.exports.failure = function(res,next,data,http_code){
_respond(res,next,'failure',data,http_code); //status set to success
}
