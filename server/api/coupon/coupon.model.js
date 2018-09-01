'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _coupon = require('./coupon.events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CouponSchema = new _mongoose2.default.Schema({
  name: {
    type: String
  },
  offerPercentage: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

(0, _coupon.registerEvents)(CouponSchema);
exports.default = _mongoose2.default.model('Coupon', CouponSchema);
//# sourceMappingURL=coupon.model.js.map
