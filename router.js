/*
 *	Router module
 */


 function route( handle, pathname, response, post_data ) {

 	/*
 	 * If a request handler exists for the given path name, call the according handler function.
 	 * Otherwise return an error.
 	 */  

 	if( typeof handle[ pathname ] === 'function' ) {
 		handle[ pathname ]( response, post_data ) ;
 	}

 	else {
 		console.log( 'No request handler found for ' + pathname ) ;

 		response.writeHead( 404, { 'Content-Type' : 'text/plain' } ) ;
 		response.write( '404 Not found' ) ;
 		response.end( ) ;
 	}
 }

 exports.route = route ;