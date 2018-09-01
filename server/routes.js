/**
 * Main application routes
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  // Insert routes below
  //app.use('/api/newsletters', require('./api/newsletter'));
  //app.use('/api/pincodes', require('./api/pincode'));
  //app.use('/api/newscomments', require('./api/newscomment'));
  //app.use('/api/testimonials', require('./api/testimonial'));
  //app.use('/api/wishlists', require('./api/wishlist'));
  //app.use('/api/carddetails', require('./api/carddetail'));
  app.use('/api/contacts', require('./api/contact'));
  // app.use('/api/booktables', require('./api/booktable'));
  app.use('/api/ratings', require('./api/rating'));
  //app.use('/api/addresses', require('./api/address'));
  // app.use('/api/notifications', require('./api/notification'));
  //app.use('/api/messages', require('./api/message'));
  //app.use('/api/upcomings', require('./api/upcoming'));
  // app.use('/api/coupons', require('./api/coupon'));
  // app.use('/api/favourites', require('./api/favourite'));
  // app.use('/api/news', require('./api/news'));
  //app.use('/api/tags', require('./api/tag'));
  app.use('/api/settings', require('./api/setting'));
  //app.use('/api/orders', require('./api/order'));
  //app.use('/api/businesses', require('./api/business'));
  // app.use('/api/menuItems', require('./api/menuItem'));
  app.use('/api/lookups', require('./api/lookups'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/qns', require('./api/question'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(_errors2.default[404]);

  // All other routes should redirect to the index.html
  app.route('/*').get(function (req, res) {
    res.sendFile(_path2.default.resolve(app.get('appPath') + '/index.html'));
  });
};

var _errors = require('./components/errors');

var _errors2 = _interopRequireDefault(_errors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=routes.js.map
