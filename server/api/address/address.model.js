'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _address = require('./address.events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddressSchema = new _mongoose2.default.Schema({
  user: {
    type: _mongoose.Schema.ObjectId,
    ref: 'User'
  },
  //for store 
  storeName: {
    type: String
  },
  userName: {
    type: String
  },
  email: {
    type: String
  },
  contactNumber: {
    type: Number
  },
  //for employee
  homeName: {
    type: String
  },
  homeNumber: {
    type: Number
  },
  apartmentName: {
    type: String
  },
  streetName: {
    type: String
  },
  landmark: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  country: {
    type: String
  },
  pincode: {
    type: Number
  },
  primaryAddress: {
    type: Boolean,
    default: false
  },
  tag: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

(0, _address.registerEvents)(AddressSchema);
exports.default = _mongoose2.default.model('Address', AddressSchema);
//# sourceMappingURL=address.model.js.map
