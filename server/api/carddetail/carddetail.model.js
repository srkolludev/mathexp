'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _carddetail = require('./carddetail.events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CarddetailSchema = new _mongoose2.default.Schema({
  user: {
    type: _mongoose.Schema.ObjectId,
    ref: 'User'
  },
  //for stripe  only
  lastFourDigit: {
    type: Number
  },
  //for stripe only
  customerId: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

(0, _carddetail.registerEvents)(CarddetailSchema);
exports.default = _mongoose2.default.model('Carddetail', CarddetailSchema);
//# sourceMappingURL=carddetail.model.js.map
