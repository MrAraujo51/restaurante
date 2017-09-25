/*
 * @author: Manuel Araujo <alejandromanuel5187@gmail.com>
 * Created on 2017-09-23 10:56:40 
 */

const User      = require('./user.server.model');
const jwt       = require('jsonwebtoken');
const config    = require('../config/config');
const privateKey = config.privateKey

/**
 * Get a specific user's information.
 * 
 * @param userId - User id
 * @returns specified user's information.
 */
exports.getUserById= (req, res) => {
    if (!req.params.userId) return res.status(400).json({success: false, message: 'User ID not provide'}); // Return Error
    User.findById(req.params.userId, (err, user) => {
        if (err) return res.status(500).json({ success: false, message: `Request failed: ${err}`}); // Return Coneccition Error
        if (!user) return res.status(404).json({ success: false, message: 'User not found'}) // Return as not found user
        return res.status(200).json({ success:true, user: user}); // Return user
    });
}

/**
 * Save user to database
 * 
 * @param user - user object
 * @returns JSON object with success boolean and message
 */

exports.saveUser = (req, res) => {
    
    if (!req.body.email)    return res.status(400).json({ success: false, message: 'You must provide an e-mail' });
    if (!req.body.password) return res.status(400).json({ success: false, message: 'You must provide a password' });
    if (!req.body.rol)      return res.status(400).json({ success: false, message: 'You must provide a rol'})
    let user = new User({
        email: req.body.email.toLowerCase(),
        password: req.body.password,
        rol: req.body.rol.toLowerCase()
    })
    
    user.save( (err) => {
        if (err) {
            // Check if error is an error indicating duplicate account
            if (err.code === 11000) return res.status(409).json({ success: false, message: 'e-mail already exists' }); // Return error
            if(err.errors) {
                if (err.errors.email) return res.status(400).json({ success: false, message: err.errors.email.message }); // Return error
                  
                // Check if validation error is in the password field
                if (err.errors.password) return res.status(400).json({ success: false, message: err.errors.password.message }); // Return error
                
                return res.status(500).json({ success: false, message: `Could not save user. Error: ${err}` }); // Return any other error not already covered
                      
            } 
            return res.status(500).json({ success: false, message: `Could not save user. Error: ${err}` }); // Return any other error not already covered
        }
        return res.status(201).json({ success: true, message: 'Acount registered!'})
    });
}

/**
 * Update user in dataBase
 * 
 * @param {string} userId - id user
 * @param {any} update - JSON object to update 
 * @returns 
 */
exports.updateUser = (req, res) => {
    let userId = req.params.userId;
    let update = req.body
    if(!userId) return res.status(400).json({ success: false, message: 'No user id provided' }) // Return Error
    
    User.findByIdAndUpdate(userId, { $set: update}, (err, user) => {
        if(err) return res.status(500).json({ success: false, message: `Request failed: ${err}`}); // Return Coneccition Error
        // Check if id is valid ID
        if(!user) return res.status(404).json({ success: false, message: 'User id not found'}); // Return error message

        return res.status(200).json({success: true, user: user});
        
    });
}

/**
 * Check if a email is already taken
 * 
 * @param {string} email
 * @returns 
 */
exports.checkEmail = (req, res) => {
    if (!req.params.email) return res.status(400).json({ success: false, message: 'E-mail was not provided' })
    
    // Search for user's e-mail in database
    User.findOne({ email: req.params.email}, (err, user) => {
        if (err) return res.status(500).json({ success: false, message: err}); //Return connction error
        
        if (user) return res.json({ success: false, message: 'E-mail is already taken'}); //Return as taken email
            
        return res.status(200).json({ success: true, message: 'E-mail is available'}); //Return as available email
    });
    
}


/**
 * Athentication for users
 * 
 * @param {String} email 
 * @param {String} password 
 * @returns 
 */
exports.authenticate = (req, res) => {
    if(!req.body.email) return res.status(400).json({ success: false, message: 'No email was provided'});
    if(!req.body.password) return res.status(400).json({ success: false, message: 'No password was provided'});
    
    User.findOne({ email: req.body.email.toLowerCase()}, (err, user) => {
        if (err) return res.status(500).json({ success: false, message: err}); //Return connction error
        
        if (!user) return res.status(422).json({ success: false, message: `User not found`}); 
        
        if ( !user.comparePassword(req.body.password) ) return res.status(401).json({ success: false, message: 'Password Invalid'});
       
        var tokenData = {
            email: user.email,
            _id: user._id
        }
        
        var token = jwt.sign(tokenData, privateKey, {expiresIn: '24h'});

        res.status(200).json({
            success: true,
            token: `JWT ${token}`,
            user: {
                email: user.email
            }
        });
    });
}


/**
 * Change a password
 * 
 * @param {String} newPassword 
 */
exports.newPassword = (req, res) => {
    jwt.verify(req.body.token, privateKey, (err, decode) => {
        if (err) return res.status(500).json({ success: false, message: `Request failed: ${err}` });
        User.findOne({_id: decode._id }, (err, user) => {
            if (err) return res.status(500).json({ success: false, message: `Request failed: ${err}` });
            if (!user) return res.status(422).json({ success: false, message: `User not found` });
            if ( !user.comparePassword(req.body.password) ) return res.status(401).json({ success: false, message: 'Password Invalid'});
            if (req.body.newPassword !== req.body.confirmNew) return res.status(400).json({ success: false, message: `Password Mismatch` });

            user.password = req.body.newPassword;
            user.save( (err) => {
                if (err) return res.status(500).json({ success: false, message: `Request failed: ${err}` });
                res.status(200).json({ success: true, message: `Password changed successfully`})
            });
        });
    });
}