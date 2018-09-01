'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BusinessSchema = new _mongoose2.default.Schema({
  email: {
    type: String
  },
  profession: {
    type: String
  },
  description: {
    type: String
  },
  address: {
    type: Array
  },
  facebookUrl: {
    type: String
  },
  instagramUrl: {
    type: String
  },
  twitterUrl: {
    type: String
  },
  officeLocation: {
    type: Array
  },
  phoneNumber: {
    type: Number
  },
  pinterestPage: {
    type: String
  },
  storeName: {
    type: String
  },
  mapAnnotation: {
    type: Array
  },
  mapOriginLatitude: {
    type: Number
  },
  mapOriginLongitude: {
    type: Number
  },
  mapZoomLevel: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

exports.default = _mongoose2.default.model('Business', BusinessSchema);
//# sourceMappingURL=business.model.js.map
