const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwks = require('jwks-rsa');
const { jwtConfig } = require('../configs/config');

// For Protected routes
const jwtCheck = jwt({
	// Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: jwtConfig.jwksRequestsPerMinute,
        jwksUri: jwtConfig.jwksUri
    }),
	// Validate the audience and the issuer.
    audience: jwtConfig.audience,
    issuer: jwtConfig.issuer,
    algorithms: jwtConfig.algorithms
});

module.exports = {
	jwtCheck
};