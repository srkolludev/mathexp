'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _pincode = require('./pincode.events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PincodeSchema = new _mongoose2.default.Schema({
  pincode: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

(0, _pincode.registerEvents)(PincodeSchema);
exports.default = _mongoose2.default.model('Pincode', PincodeSchema);
//# sourceMappingURL=pincode.model.js.map
