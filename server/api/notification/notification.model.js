'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _notification = require('./notification.events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotificationSchema = new _mongoose2.default.Schema({
  order: {
    type: _mongoose.Schema.ObjectId,
    ref: 'Order'
  },
  priceGrandTotal: {
    type: Number
  },
  orderID: {
    type: Number
  },
  readNotification: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

(0, _notification.registerEvents)(NotificationSchema);
exports.default = _mongoose2.default.model('Notification', NotificationSchema);
//# sourceMappingURL=notification.model.js.map
