'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.index = index;
exports.create = create;
exports.createByAdmin = createByAdmin;
exports.show = show;
exports.destroy = destroy;
exports.changePassword = changePassword;
exports.resetPassword = resetPassword;
exports.me = me;
exports.storeDetails = storeDetails;
exports.upsert = upsert;
exports.accCreateAndTrans = accCreateAndTrans;
exports.stripePayment = stripePayment;
exports.demohtmlpdf = demohtmlpdf;
exports.sendResetEmail = sendResetEmail;
exports.ResetPassword = ResetPassword;
exports.authCallback = authCallback;

var _user = require('./user.model');

var _user2 = _interopRequireDefault(_user);

var _environment = require('../../config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _carddetail = require('../carddetail/carddetail.model');

var _carddetail2 = _interopRequireDefault(_carddetail);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Include NPM 
var async = require("async");
var crypto = require("crypto");
var path = require("path");

// Email Config
var nodemailer = require('nodemailer');
var api_key = 'key-7fa9edb1b8f46cc6d5995448cd733241';
var domain = 'impnolife.org';
var smtpConfig = {
  host: 'email-smtp.us-west-2.amazonaws.com',
  port: 587,
  //secure: true, // use SSL
  auth: {
    user: 'AKIAJQQCVESBWY53KGZA',
    pass: 'Aq05JPK8+D9QALlP9owzrMMzeiks7o3UvJIZnMP+KsJ+'
  }
};
var transport = nodemailer.createTransport(smtpConfig);
//*********************

var mailgun = require('mailgun-js')({
  apiKey: api_key,
  domain: domain
});

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function (err) {
    return res.status(statusCode).json(err);
  };
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    return res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
function index(req, res) {
  return _user2.default.find({}, '-salt -password').exec().then(function (users) {
    res.status(200).json(users);
  }).catch(handleError(res));
}

/**
 * Creates a new user
 */
/*export function create(req, res) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = req.body.role || 'user';
  newUser.save()
    .then(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}
*/
//sign up by user
function create(req, res) {
  _user2.default.find({ email: req.body.email }, {}).exec(function (err, emailexists) {
    if (err) {
      return handleError(err, res);
    }
    if (emailexists.length > 0) {
      res.status(400).send({
        message: 'This email already exists,try with different email id.'
      });
    } else {
      var newUser = new _user2.default(req.body);
      newUser.email = req.body.email;
      newUser.password = req.body.password;
      newUser.provider = 'local';
      newUser.image = req.body.image;
      newUser.role = req.body.role || 'user';
      if (newUser.role == 'user') {
        newUser.totalLoyaltyPoints = 0;
      }
      newUser.save().then(function (user) {
        // var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        //   expiresIn: 60 * 60 * 5
        // });
        //res.json({ token });
        async.waterfall([
        // Generate random token
        function (done) {
          crypto.randomBytes(20, function (err, buffer) {
            var token = buffer.toString('hex');
            done(err, token);
          });
        },
        // Lookup user by username
        function (token, done, err) {
          done(err, token, user);
        }, function (token, user, done) {
          var httpTransport = 'http://';
          if (_environment2.default.secure && _environment2.default.secure.ssl === true) {
            httpTransport = 'https://';
          }
          res.render(path.resolve('server/components/email/welcomeEmail'), {
            email: user.email,
            name: user.name,
            appName: 'Restaurant App'
          }, function (err, emailHTML) {
            console.log('111111111333');
            done(err, emailHTML, user);
          });
        },
        // If valid email, send reset email using service
        function (emailHTML, user, done) {
          var mailOptions = {
            to: user.email,
            from: 'info@impnolife.org',
            subject: 'Welcome to Restaurant App',
            html: emailHTML
          };
          mailgun.messages().send(mailOptions, function (err) {
            if (!err) {
              res.send({
                message: 'An email has been sent to the provided email with further instructions.'
              });
            } else {
              return res.status(400).send({
                message: 'Failure sending email'
              });
            }
            done(err);
          });
        }], function (err) {
          if (err) {
            return next(err);
          }
        });
      }).catch(validationError(res));
    }
  });
}

//sign up by admin
function createByAdmin(req, res) {
  console.log('createByAdmin start.................');
  _user2.default.find({ email: req.body.email }, {}).exec(function (err, emailexists) {
    if (err) {
      return handleError(err, res);
    }
    if (emailexists.length > 0) {
      res.status(200).send({
        message: 'This email already exists,try with different email id.'
      });
    } else {
      var newUser = new _user2.default();
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.street = req.body.street;
      newUser.city = req.body.city;
      newUser.ZIP = req.body.ZIP;
      newUser.country = req.body.country;
      newUser.phone = req.body.phone;
      newUser.password = req.body.password;
      newUser.provider = 'local';
      newUser.role = req.body.role || 'user';
      newUser.save().then(function (user) {
        var token = _jsonwebtoken2.default.sign({ _id: user._id }, _environment2.default.secrets.session, {
          expiresIn: 60 * 60 * 5
        });
        res.json({ token: token });
      }).catch(validationError(res));
    }
  });
}

/**
 * Get a single user
 */
function show(req, res, next) {
  var userId = req.params.id;
  return _user2.default.findById(userId, 'name email image phone').exec().then(function (user) {
    if (!user) {
      return res.status(404).end();
    }
    res.json(user.profile);
  }).catch(function (err) {
    return next(err);
  });
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
function destroy(req, res) {
  return _user2.default.findByIdAndRemove(req.params.id).exec().then(function () {
    res.status(204).end();
  }).catch(handleError(res));
}

/**
 * Change a users password
 */
function changePassword(req, res) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return _user2.default.findById(userId).exec().then(function (user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      return user.save().then(function () {
        res.status(204).end();
      }).catch(validationError(res));
    } else {
      return res.status(403).end();
    }
  });
}

/* Reset Password */
function resetPassword(req, res, next) {
  // Init Variables
  var resetToken = req.body.resetToken;
  var newPass = req.body.newPassword;
  _user2.default.findOne({ resetPasswordToken: resetToken }, function (err, user) {

    user.password = newPass;
    user.updatedAt = new Date(Date.now());

    // Not User Error
    if (!user) {
      return res.status(400).send({
        message: 'User not found!'
      });
    }

    // Save User 
    user.save(function (err) {
      if (err) {
        return handleError(res);
      } else {
        return res.status(200).send({
          message: 'Password Changed Successfully!!'
        });
      }
    });
  });
}

/**
 * Get my info
 */
function me(req, res, next) {
  var userId = req.user._id;
  console.log('req.user' + (0, _stringify2.default)(req.user));
  return _user2.default.findOne({ _id: userId }, '-salt -password').exec().then(function (user) {
    // don't ever give out the password or salt
    if (!user) {
      return res.status(401).end();
    }
    res.json(user);
  }).catch(function (err) {
    return next(err);
  });
}

//Detailed info of  a store
function storeDetails(req, res) {
  _user2.default.find({ role: 'admin' }, '-salt -password').exec(function (err, storedetails) {
    if (err) {
      return handleError(err, res);
    } else {
      res.json(storedetails[0]);
    }
  });
}

// Upserts the given user in the DB at the specified ID
function upsert(req, res) {
  console.log('req.user' + (0, _stringify2.default)(req.user));
  console.log('req.body' + (0, _stringify2.default)(req.body));
  return _user2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: false }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// //get stripe token
// export function accCreateAndTrans(req, res, next) {
//   console.log('req.body'+JSON.stringify(req.body))
//   var stripe = require("stripe")(
//     "sk_test_BQokikJOvBiI2HlWgH4olfQ2"
//   );
//   stripe.tokens.create({
//     card: {
//       object: 'card',
//       exp_month: req.body.month,
//       exp_year: req.body.year,
//       number: req.body.cardNumber,
//       cvc: req.body.cvc//100'4242 4242 4242 4242',
//     }
//   }, function(err, token) {
//     if(err){
//      return handleError(err,res)
//     }
//     else{
//       //got token id
//       console.log('token'+JSON.stringify(token))
//       // Create a Customer:
//       stripe.customers.create({
//         email: req.user.email,//"shubh037@gmail.com",
//         source: token.id//'tok_1At9Xi2eZvKYlo2CVhMEj8Io',//token id
//       }).then(function(customer) {
//         var  customerId ={
//           customerId:customer.id
//         } 
//         let carddetail           = new Carddetail();
//         carddetail.user          = req.user._id;
//         carddetail.lastFourDigit = customer.sources.data[0].last4;
//         carddetail.customerId    = customer.id;
//         carddetail.save(function(err){
//           if(err){
//             return handleError(err,res);
//           }
//           else{
//             res.json(customerId)
//           }
//         })
//       })
//     }
//   })
// }

//get stripe token
function accCreateAndTrans(req, res, next) {
  var stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");
  stripe.tokens.create({
    card: {
      object: 'card',
      exp_month: req.body.month,
      exp_year: req.body.year,
      number: req.body.cardNumber,
      cvc: req.body.cvc //100'4242 4242 4242 4242',
    }
  }, function (err, token) {
    if (err) {
      return handleError(err, res);
    } else {
      //got token id
      console.log('token' + (0, _stringify2.default)(token));
      // Create a Customer:
      stripe.customers.create({
        email: req.user.email, //"shubh037@gmail.com",
        source: token.id //'tok_1At9Xi2eZvKYlo2CVhMEj8Io',//token id
      }).then(function (customer) {
        var customerId = {
          customerId: customer.id
        };
        var carddetail = new _carddetail2.default();
        carddetail.user = req.user._id;
        carddetail.lastFourDigit = customer.sources.data[0].last4;
        carddetail.customerId = customer.id;
        carddetail.save(function (err) {
          if (err) {
            return handleError(err, res);
          } else {
            res.json(customerId);
          }
        });
      });
    }
  });
}
//stripe payment
function stripePayment(req, res) {
  console.log('req.body' + (0, _stringify2.default)(req.body));
  var stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");
  stripe.charges.create({
    amount: req.body.amount,
    currency: "usd",
    customer: req.body.customerId //'cus_BFesiWxNtkgF6G',//customer id
  }).then(function (charge) {
    res.status(200).send({

      message: 'Thank you,Your transaction was successful.'
    });
  });
}

//sign up by user
function demohtmlpdf(req, res) {
  var fs = require('fs');
  var pdf = require('html-pdf');
  var html = fs.readFileSync('./server/components/email/welcomeEmail.html', 'utf8');
  var options = { format: 'Letter' };
  console.log('qwertyuiop.................');
  pdf.create(html, options).toFile('./businesscard.pdf', function (err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });
}

//resend Password
function sendResetEmail(req, res) {
  var email = req.body.email;
  _user2.default.findOne({ 'email': email }).exec(function (err, user) {
    //console.log("wwwwww"+user);
    if (err) {
      return handleError(res);
    }
    if (!user) {
      return res.status(404).send({
        message: 'There is no User with this email id.'
      });
    }
    var randomNo = Math.floor(Math.random() * 900000) + 100000;
    //console.log("rrrr"+randomNo);
    transport.sendMail({
      from: 'info@elysiot.com',
      to: email,
      subject: 'Reset Password Verification Code - OTP',
      html: 'Your Reset Password OTP Is : ' + randomNo
    }, function (error, data) {
      if (error) {
        console.log(error + "error");
      }
      if (data) {
        //update


        user.forgetPasswordNo = randomNo;
        //console.log('forgetPasswordNo'+JSON.stringify(user) )
        user.save(function (err, work) {
          if (err) {
            return handleError(res);
          }

          console.log("user" + (0, _stringify2.default)(work));
          var token = _jsonwebtoken2.default.sign({ _id: user._id }, _environment2.default.secrets.session, {
            expiresIn: 60 * 60 * 5
          });

          return res.status(200).send({
            message: 'Email exist. OTP sent on email/phone'
          });
        });
      }
    });
  });
}
//****************************************
function ResetPassword(req, res) {
  var email = req.body.email;
  var forgetPasswordNo = req.body.forgetPasswordNo;
  var newPassword = req.body.newPass;
  _user2.default.findOne({ 'email': email }, '-salt -password').exec(function (err, users) {
    if (err) {
      console.log('err' + err);
      res.status(400).send({
        message: 'Something went wrong.'
      });
    } else {
      console.log('qwertyuio.........' + (0, _stringify2.default)(users));
      if (users.forgetPasswordNo == forgetPasswordNo) {
        users.password = newPassword;
        users.forgetPasswordNo = Math.floor(Math.random() * 900000) + 100000;
        return users.save(function (err, users) {
          if (err) {
            return handleError(res);
          }
          var token = _jsonwebtoken2.default.sign({ _id: users._id }, _environment2.default.secrets.session, {
            expiresIn: 60 * 60 * 5
          });
          var tokendata = {
            token: token,
            message: "new password sucessfully updated"
          };
          console.log('token' + (0, _stringify2.default)(tokendata));
          res.json(tokendata);
        });
      } else {
        res.status(400).send({
          message: "otp mismatched"
        });
      }
    }
  });
}
/**
 * Authentication callback
 */
function authCallback(req, res) {
  res.redirect('/');
}
//# sourceMappingURL=user.controller.js.map
