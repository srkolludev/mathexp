'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _newsletter = require('./newsletter.events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NewsletterSchema = new _mongoose2.default.Schema({
  email: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

(0, _newsletter.registerEvents)(NewsletterSchema);
exports.default = _mongoose2.default.model('Newsletter', NewsletterSchema);
//# sourceMappingURL=newsletter.model.js.map
