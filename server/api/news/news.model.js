'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NewsSchema = new _mongoose2.default.Schema({
  thumb: {
    type: String
  },
  title: {
    type: String
  },
  shortDescription: {
    type: String
  },
  fullDescription: {
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

exports.default = _mongoose2.default.model('News', NewsSchema);
//# sourceMappingURL=news.model.js.map
