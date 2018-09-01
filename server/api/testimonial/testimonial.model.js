'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _testimonial = require('./testimonial.events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TestimonialSchema = new _mongoose2.default.Schema({
  name: {
    type: String
  },
  image: {
    type: String
  },
  rating: {
    type: Number
  },
  message: {
    type: String
  },
  companyName: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

(0, _testimonial.registerEvents)(TestimonialSchema);
exports.default = _mongoose2.default.model('Testimonial', TestimonialSchema);
//# sourceMappingURL=testimonial.model.js.map
