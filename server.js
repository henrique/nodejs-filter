/*
 *	Server module
 */


var http = require( 'http' ) ;
var url = require( 'url' ) ;

function start( route, handle ) {

	function onRequest( request, response ) {
		var post_data = '' ;

		var pathname = url.parse( request.url ).pathname ;
		console.log( 'Request for ' + pathname + ' received.' ) ;

		request.setEncoding( 'utf8' ) ;

		// called when another chunk of data has been received
		request.addListener( 'data', function( data_progress ) {
			post_data += data_progress ;
		} ) ;

		// called when all of the data has been received
		request.addListener( 'end', function( ) {
			// Let's try and parse the received data as JSON
			try {
				var json = JSON.parse( post_data ) ;
				// If everything's ok so far, let's pass the JSON data to the router for further handling
				route( handle, pathname, response, json ) ;
			}

			// Parsing failed, so let's return an error
			catch( err ) {
				console.log( 'JSON error' ) ;

				var json = { 'error' : 'Could not decode request: JSON parsing failed' } ;

				response.writeHead( 400, { 'Content-Type' : 'application/json' } ) ;
			 	response.write( JSON.stringify( json ) ) ;
			 	response.end( ) ;
			}
			
		} ) ;
	}


	var port = Number( process.env.PORT || 5000 ) ;

	http.createServer( onRequest ).listen( port ) ;
	console.log( 'Server has started.' ) ;
}

exports.start = start ; 

