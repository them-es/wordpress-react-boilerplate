import data from './_setup.json';

const WPAPI = require( 'wpapi' );

const wp = new WPAPI( {
  // http://wp-api.org/node-wpapi/using-the-client
  endpoint: data.url.api,
} );

export { wp };
