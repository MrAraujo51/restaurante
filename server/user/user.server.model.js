/*
 * @author: Manuel Araujo <alejandromanuel5187@gmail.com> 
 * Created on 2017-09-23 10:56:58 
 */

const mongoose = require('mongoose'); // Node Tool for MongoDB
const Schema = mongoose.Schema; // Import Schema from Mongoose
const bcrypt = require('bcryptjs'); // A native JS bcrypt library for NodeJS

/**
 * Help function that determines whether the e-mail length 
 * is greater than 5 and less than 30
 * 
 * @param {string} email - user email
 * @returns {boolean} @code true if e-mail length is valid
 * {@code false} if the email is invalid or not exist
 */
let emailLengthChecker = (email) => {
    // Check if e-mail exists
    if (!email) return false; // Return error

    // Check the length of e-mail string
    if (email.length < 5 || email.length > 30) return false; // Return error if not within proper length
        
    return true; // Return as valid e-mail
};

/**
 * Help function that determines if the e-mail format is valid
 * 
 * @param {string} email - user email
 * @returns {boolean} 
 * @code true | if a valid e-mail format
 * @code false | if e-mail format is ivalid or e-mail not exist
 */
let validEmailChecker = (email) => {
    // Check if e-mail exists
    if (!email) return false; // Return error
    // Regular expression to test for a valid e-mail
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email); // Return regular expression test results (true or false)
};

let tektonEmailChecker = (email) => {
    if(!email) return false; // Return Error
    // The regular expression to test whether an email contains the word tekton
    const regExp = new RegExp(/tekton/);
    return regExp.test(email); // Return regular expression test results (true or false)
}

/**
 * Array of Email Validators
 * 
 * @constant 
 */
const emailValidators = [
  // First Email Validator
  {
    validator: emailLengthChecker,
    message: 'E-mail must be at least 5 characters but no more than 30'
  },
  // Second Email Validator
  {
    validator: validEmailChecker,
    message: 'Must be a valid e-mail'
  },
  // Third Email validator
  {
      validator: tektonEmailChecker,
      message: 'the email contain tekton'
  }
];


/**
 * Help function that determines whether the username length 
 * is greater than 8 and less than 35
 * 
 * @param {string} password - password user
 * @returns {boolean}
 * @code true | if the password length is valid
 * @code false | if the password length is invalid  
 */

let passwordLengthChecker = (password) => {
  // Check if password exists
  if (!password) {
    return false; // Return error
  } else {
    // Check password length
    if (password.length < 8 || password.length > 35) {
      return false; // Return error if passord length requirement is not met
    } else {
      return true; // Return password as valid
    }
  }
};


/**
 * Array of Password validators
 * @constant
 */
const passwordValidators = [
  // First password validator
  {
    validator: passwordLengthChecker,
    message: 'Password must be at least 8 characters but no more than 35'
  },
];

/**
 * User Model Definition
 * 
 * @constant
 */
const userSchema = new Schema({
  email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      validate: emailValidators
  },
  password: {
      type: String,
      require: true,
      validate: passwordValidators
  },
  signupDate: {
    type: String,
    default: Date.now()
  },
  lastLogin: Date,
  rol: {
    type: String,
    enum: ['cajero', 'chef', 'admin'],
    require: true
  }
    

});

/**
 * Schema Middleware to Encrypt Password
 */
userSchema.pre('save', function(next){
  let user = this;
  // Ensure password is new or modified before applying encryption
  if (!this.isModified("password"))
    return next();

  // Apply encryption
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)

      this.password = hash
      next()
    })
  })
});

// Methods to compare password to encrypted password upon login
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password); // Return comparison of login password to password in database (true or false)
};



const User = module.exports = mongoose.model('User', userSchema);