// Require the necessary modules



var server = require( './server' ) ;
var router = require( './router' ) ;
var requestHandlers = require( './handlers' ) ;


/*
 * Here we will create an object that contains a list of request handlers and pass it to the server.
 * This is not really needed in the scope of this application, but if we wanted to add more functionality
 * we could simply define another handle here and add a corresponding function to the handlers module.
 */

var handle = { } ;
handle[ "/" ] = requestHandlers.filter ; // default handler


server.start( router.route, handle ) ;