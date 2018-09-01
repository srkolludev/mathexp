/**earning
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/orders              ->  index
 * POST    /api/orders              ->  create
 * GET     /api/orders/:id          ->  show
 * PUT     /api/orders/:id          ->  upsert
 * PATCH   /api/orders/:id          ->  patch
 * DELETE  /api/orders/:id          ->  destroy  
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.index = index;
exports.userOrders = userOrders;
exports.show = show;
exports.create = create;
exports.upsert = upsert;
exports.earning = earning;
exports.destroy = destroy;
exports.userNotification = userNotification;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _order = require('./order.model');

var _order2 = _interopRequireDefault(_order);

var _user = require('../user/user.model');

var _user2 = _interopRequireDefault(_user);

var _setting = require('../setting/setting.model');

var _setting2 = _interopRequireDefault(_setting);

var _environment = require('../../config/environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Include NPM 
var async = require("async");
var crypto = require("crypto");
var path = require("path");

// Email Config
//var nodemailer = require('nodemailer');
var api_key = 'key-7fa9edb1b8f46cc6d5995448cd733241';
var domain = 'impnolife.org';

var mailgun = require('mailgun-js')({
  apiKey: api_key,
  domain: domain
});
function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function (entity) {
    try {
      _fastJsonPatch2.default.apply(entity, patches, /*validate*/true);
    } catch (err) {
      return _promise2.default.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Orders
function index(req, res) {
  return _order2.default.find().sort('-orderID').populate('user', 'name email phone').exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a list of Orders of a user
function userOrders(req, res) {
  return _order2.default.find({ 'user': req.user.id }, {}).populate('user', 'name email phone').exec().then(respondWithResult(res)).catch(handleError(res));
}
// Gets a single Order from the DB
function show(req, res) {
  return _order2.default.findById(req.params.id).populate('user', 'name email phone').exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Order in the DB 
function create(req, res) {
  var order = new _order2.default(req.body);
  order.user = req.user.id;
  var datedata = new Date();
  datedata = Date.now();
  order.userNotification.push({ 'status': 'Thank you for your order',
    'time': datedata });
  order.userNotification.push({ 'status': 'Waiting for your payment to be processed.',
    'time': datedata });
  if (req.body.paymentOption == 'COD') {
    order.userNotification.push({ 'status': 'Awaiting confirmation from vendor.',
      'time': datedata });
  }
  order.paymentOption = req.body.paymentOption;
  order.save(function (err) {
    if (err) {
      res.status(400).send({
        message: 'order couldn\'t placed.'
      });
    } else {
      //res.json(order);
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
        done(err, token);
      }, function (token, done) {
        var httpTransport = 'http://';
        if (_environment2.default.secure && _environment2.default.secure.ssl === true) {
          httpTransport = 'https://';
        }
        res.render(path.resolve('server/components/orderStatus/orderrequested'), {
          email: req.user.email,
          name: req.user.name,
          appName: 'Restaurant App'
        }, function (err, emailHTML) {
          done(err, emailHTML);
        });
      },
      // If valid email, send reset email using service
      function (emailHTML, user, done) {
        var mailOptions = {
          to: req.user.email,
          from: 'info@impnolife.org',
          subject: 'Thank you for your order.',
          html: emailHTML
        };
        mailgun.messages().send(mailOptions, function (err) {
          if (!err) {
            res.json(order);
          } else {
            return res.status(400).send({
              message: 'Failure sending email'
            });
          }
        });
      }], function (err) {
        if (err) {
          return next(err);
        }
      });
    }
  });
}

// Upserts the given Order in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  _order2.default.findById(req.params.id).exec(function (err, orderdata) {
    var datedata = new Date();
    datedata = Date.now();
    var notifytext = void 0;
    if (req.body.payment) {
      notifytext = 'Awaiting confirmation from vendor.';
      orderdata.userNotification.push({ 'status': 'Awaiting confirmation from vendor.', 'time': datedata });
    }
    if (req.body.status == 'Accepted') {
      notifytext = 'Order Accepted by vendor.';
      orderdata.userNotification.push({ 'status': 'Order Accepted by vendor.', 'time': datedata });
    }
    if (req.body.status == 'On the Way') {
      notifytext = 'Order Accepted by vendor.';
      orderdata.userNotification.push({ 'status': 'Your order is on the way.', 'time': datedata });
    }
    if (req.body.status == 'Delivered') {
      notifytext = 'Your order has been delivered,Share your experience with us.';
      orderdata.userNotification.push({ 'status': 'Your order has been delivered,Share your experience with us.', 'time': datedata });
      _setting2.default.findOne().exec(function (err, setting) {
        if (err) {
          return handleError(err, res);
        }
        if (!setting) {
          return res.status(404).end();
        }
        var minOrdLoyality = setting.minOrdLoyality;
        var point = 0;
        if (orderdata.subTotal >= minOrdLoyality) {
          point = point + orderdata.subTotal * 2 / 100;
          console.log("pppppppppp..........." + point);
          console.log('.........' + orderdata.subTotal);
        } else {
          point = point;
        }
        var loyaltyDetail = {
          point: point,
          credited: true,
          orderId: orderdata._id,
          createdAt: new Date()
        };
        _user2.default.findById(orderdata.user, '-salt -password').exec(function (err, loyalty) {
          if (err) {
            return handleError(err, res);
          } else {
            loyalty.loyaltyPoints.push(loyaltyDetail);
            loyalty.totalLoyaltyPoints = loyalty.totalLoyaltyPoints + point;
            //loyalty.totalLoyaltyPoints
            loyalty.save(function (err) {
              if (err) {
                return handleError(err, res);
              } else {
                // res.json({message:
                //   'your order is successfully placed'
                // }).end();
              }
            });
          }
        });
      });
    }

    if (req.body.status == 'Cancelled') {
      notifytext = 'Your order is cancelled,sorry for inconvenience.';
      orderdata.userNotification.push({ 'status': 'Your order is cancelled,sorry for inconvenience.', 'time': datedata });
    }
    orderdata.save(function (err) {
      if (err) {
        res.status(400).send({
          message: 'order couldn\'t placed.'
        });
      } else {
        //res.json(order);
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
          done(err, token);
        }, function (token, done) {
          var httpTransport = 'http://';
          if (_environment2.default.secure && _environment2.default.secure.ssl === true) {
            httpTransport = 'https://';
          }
          res.render(path.resolve('server/components/orderStatus/orderrequested'), {
            notifytext: notifytext,
            name: req.user.name,
            appName: 'Restaurant App'
          }, function (err, emailHTML) {
            done(err, emailHTML);
          });
        },
        // If valid email, send reset email using service
        function (emailHTML, user, done) {
          var mailOptions = {
            to: req.user.email,
            from: 'info@impnolife.org',
            subject: 'Thank you for your order.',
            html: emailHTML
          };
          mailgun.messages().send(mailOptions, function (err) {
            if (!err) {
              _order2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().then(res.json({
                message: 'order successfully updated' })).catch(handleError(res));
            } else {
              return res.status(400).send({
                message: 'Failure sending email'
              });
            }
          });
        }], function (err) {
          if (err) {
            return next(err);
          }
        });
      }
    });
  });
}

//DEVELOPMENT ZONE/////////////////////////////////////////
// Get Seven Day Sell Info
function earning(req, res) {
  var date = new Date();
  var midnight = date.setUTCHours(0, 0, 0, 0);
  var nextMidnight = midnight + 24 * 60 * 60 * 1000;
  var lastMidnight = midnight - 24 * 60 * 60 * 1000;
  var secondLastMidnight = midnight - 2 * 24 * 60 * 60 * 1000;
  var thirdLastMidnight = midnight - 3 * 24 * 60 * 60 * 1000;
  var fourthLastMidnight = midnight - 4 * 24 * 60 * 60 * 1000;
  var fifthLastMidnight = midnight - 5 * 24 * 60 * 60 * 1000;
  var sixthLastMidnight = midnight - 6 * 24 * 60 * 60 * 1000;
  var lastWeekMidnight = midnight - 7 * 24 * 60 * 60 * 1000;
  var start = new Date();
  start.setDate(start.getDate() - 7);
  var now = new Date(Date.now());
  _order2.default.find({ createdAt: { $gt: lastWeekMidnight, $lt: nextMidnight } }, { 'cart.itemTotalPrice': 1, 'createdAt': 1, '_id': 0 }).sort({ createdAt: 'descending' }).exec().then(function (users) {
    var now1 = new Date();
    now1.setDate(now1.getDate() - 1);
    var now2 = new Date();
    now2.setDate(now2.getDate() - 2);
    var now3 = new Date();
    now3.setDate(now3.getDate() - 3);
    var now4 = new Date();
    now4.setDate(now4.getDate() - 4);
    var now5 = new Date();
    now5.setDate(now5.getDate() - 5);
    var now6 = new Date();
    now6.setDate(now6.getDate() - 6);
    var now7 = new Date();
    now7.setDate(now7.getDate() - 7);
    var i;
    var j;
    // variables to store total earned price
    var temp1 = 0;
    var temp2 = 0;
    var temp3 = 0;
    var temp4 = 0;
    var temp5 = 0;
    var temp6 = 0;
    var temp7 = 0;
    //array for accessing different different days data
    var sellerOrder1 = [];
    var sellerOrder2 = [];
    var sellerOrder3 = [];
    var sellerOrder4 = [];
    var sellerOrder5 = [];
    var sellerOrder6 = [];
    var sellerOrder7 = [];
    //Arrays for holding per day collection
    var data1 = [];
    var data2 = [];
    var data3 = [];
    var data4 = [];
    var data5 = [];
    var data6 = [];
    var data7 = [];
    for (i = 0; i < users.length; i++) {
      //first day
      if (users[i].createdAt > midnight) {
        sellerOrder1.push(users[i]);
        for (j = 0; j < users[i].cart.length; j++) {
          temp1 = temp1 + users[i].cart[j].itemTotalPrice;
        }
      }
      // second last day
      else if (users[i].createdAt > lastMidnight && users[i].createdAt < midnight) {
          sellerOrder2.push(users[i]);
          for (j = 0; j < users[i].cart.length; j++) {
            temp2 = temp2 + users[i].cart[j].itemTotalPrice;
          }
        } else if (users[i].createdAt > secondLastMidnight && users[i].createdAt < lastMidnight) {
          sellerOrder3.push(users[i]);
          for (j = 0; j < users[i].cart.length; j++) {
            temp3 = temp3 + users[i].cart[j].itemTotalPrice;
          }
        } else if (users[i].createdAt > thirdLastMidnight && users[i].createdAt < secondLastMidnight) {
          sellerOrder4.push(users[i]);
          for (j = 0; j < users[i].cart.length; j++) {
            temp4 = temp4 + users[i].cart[j].itemTotalPrice;
          }
        } else if (users[i].createdAt > fourthLastMidnight && users[i].createdAt < thirdLastMidnight) {
          sellerOrder5.push(users[i]);
          for (j = 0; j < users[i].cart.length; j++) {
            temp5 = temp5 + users[i].cart[j].itemTotalPrice;
          }
        } else if (users[i].createdAt > fifthLastMidnight && users[i].createdAt < fourthLastMidnight) {
          sellerOrder6.push(users[i]);
          for (j = 0; j < users[i].cart.length; j++) {
            temp6 = temp6 + users[i].cart[j].itemTotalPrice;
          }
        } else if (users[i].createdAt > sixthLastMidnight && users[i].createdAt < fifthLastMidnight) {
          sellerOrder7.push(users[i]);
          for (j = 0; j < users[i].cart.length; j++) {
            temp7 = temp7 + users[i].cart[j].itemTotalPrice;
          }
        } else users[i].createdAt < 0;
      {}
    }
    var date1 = now1.getMonth();
    date1++;
    var day1 = now1.getDate();
    var label1 = date1 + '/' + day1;
    var date2 = now2.getMonth();
    date2++;
    var day2 = now2.getDate();
    var label2 = date2 + '/' + day2;
    var date3 = now3.getMonth();
    date3++;
    var day3 = now3.getDate();
    var label3 = date3 + '/' + day3;
    var date4 = now4.getMonth();
    date4++;
    var day4 = now4.getDate();
    var label4 = date4 + '/' + day4;
    var date5 = now5.getMonth();
    date5++;
    var day5 = now5.getDate();
    var label5 = date5 + '/' + day5;
    var date6 = now6.getMonth();
    date6++;
    var day6 = now6.getDate();
    var label6 = date6 + '/' + day6;
    var date7 = now7.getMonth();
    date7++;
    var day7 = now7.getDate();
    var label7 = date7 + '/' + day7;
    data1.push(label1);
    data2.push(temp1);
    data1.push(label2);
    data2.push(temp2);
    data1.push(label3);
    data2.push(temp3);
    data1.push(label4);
    data2.push(temp4);
    data1.push(label5);
    data2.push(temp5);
    data1.push(label6);
    data2.push(temp6);
    data1.push(label7);
    data2.push(temp7);
    var data = {
      data: data2
    };
    var dataFinal = [];
    dataFinal.push(data);
    var data0 = {
      labels: data1,
      datasets: dataFinal
    };
    var barData = {
      barData: data0
    };
    res.status(200).json(barData);
  }).catch(handleError(res));
}

// Deletes a Order from the DB
function destroy(req, res) {
  return _order2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}

// user notification from the DB
function userNotification(req, res) {
  return _order2.default.findById(req.params.id, 'userNotification shippingAddress').exec(function (err, data) {
    if (err) {
      return handleError(res, err);
    } else {
      res.json(data);
    }
  });
}
//# sourceMappingURL=order.controller.js.map
