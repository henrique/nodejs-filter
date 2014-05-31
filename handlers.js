/*
 *	Reuqest handlers module
 */



function filter( response, post_data ) {
	console.log( "Request handler 'filter' was called." ) ;

	var entry = {} ;	
	var response_array = [] ;
	var len = post_data.payload.length ;

	// Create a new array from the entries that pass our requirements

	for( var i = 0 ; i < len ; i++ ) {
		entry = post_data.payload[i] ;

		/* @TODO: When extending the application it would be a good idea to move these requirements out of the
		 * method, possibly into an associative array or a separate JSON file in case we want to utilize the same
		 * application for many different setups
		 */

	    if( entry.drm && entry.episodeCount > 0 ) {
	    	response_array.push( { 'image' : entry.image.showImage,
	    			    		   'slug' : entry.slug,
	    			   			   'title' : entry.title } ) ;
	    }
	}

	var json = { 'response' : response_array } ;
	
	// Add headers to prevent cross-domain issues

	var headers = { } ;
	headers[ "Content-Type" ] = "application/json" ;
    headers[ "Access-Control-Allow-Origin" ] = "*" ;
    headers[ "Access-Control-Allow-Methods" ] = "POST, GET, OPTIONS" ;
    headers[ "Access-Control-Allow-Credentials" ] = true ;
    headers[ "Access-Control-Max-Age" ] = '86400' ; 
    headers[ "Access-Control-Allow-Headers" ] = "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept" ;

	response.writeHead( 200, headers ) ;
	response.write( JSON.stringify( json ) ) ;
	response.end( ) ;
}


exports.filter = filter ;