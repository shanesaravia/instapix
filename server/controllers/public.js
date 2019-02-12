// Models
// const User = require('../models/User');
const userSchema = require('../models/User');
// Requests
const request = require('request');
// Auth
const { getManagementToken } = require('./auth');
// Firebase
const db = require('../utils/db');
// Configs
const { authManager } = require('../configs/config');


/**
 * Creates user in instapix db
 * @param  {obj} req contains username, email, auth_id
 * @param  {obj} res response obj
 * @return {obj/bool}     user obj if success else false
 */
const createUser = async function(req, res) {

    // Validate data
    if (req.body.username &&
        req.body.email &&
        req.body.auth_id) {

        // Validate user with schema
        const user = await userSchema.validate({
            username: req.body.username,
            email: req.body.email
        }).catch((err) => {
            return false;
        });

        // Write to db
        if (user) {
            let usersRef = db.collection('users').doc(req.body.auth_id);
            usersRef.set(user).then(() => {
                console.log('User created successfully!');
            }).catch((err) => {
                console.log(`Unable to create new user. Error: ${err}`);
            });
            res.send(true);
        } else {
            res.send(false);
        }

    } else {
        res.send(false);
    }
};

/**
 * Updates email verified field
 * @param  {obj} req contains email and email verified bool
 * @param  {obj} res response obj
 * @return {bool}
 */
const updateEmailVerified = function(req, res) {
    const email = req.params.email;
    const data = {'email_verified': true}

    try {
        const userRef = db.collection('users').where('email', '==', email).limit(1)
        userRef.get()
            .then((snapshot) => {
                if (snapshot.empty) {
                    console.log('No Docs Found');
                    res.send(false);
                }

                snapshot.forEach(doc => {
                    const docRef = db.collection('users').doc(doc.id)
                    docRef.update(data);
                })
                res.send(true);

            }).catch((err) => {
                console.log('Error retrieving docs: ', err);
            })
    } catch {
        res.send(false);
    }
}

/**
 * Sends verification email to user via auth0 management api
 * @param  {request object} req request data
 * @param  {response object} res response data
 * @return {bool}
 */
const sendVerificationEmail = async function(req, res) {
    const access_token = await getManagementToken();
    const user_id = req.body.userId;
    const client_id = authManager.client_id;

    // Request options
    const options = {
        method: 'POST',
        url: authManager.base_url + authManager.endpoints.verify_email_url,
        timeout: 5000, // 5 seconds
        headers: {
            'authorization': `Bearer ${access_token}`,
            'content-type': 'application/json'
        },
        body: {
            user_id,
            client_id
        }, json: true
    };

    // Send request to auth0
    request(options, function(err, resp, body) {
        if (err) console.log(err);
        if ([200, 201].includes(resp.statusCode)) {
            res.send(true);
        } else {
            res.send(false);
        }
    })
}

module.exports = {
    createUser,
    updateEmailVerified,
    sendVerificationEmail
};