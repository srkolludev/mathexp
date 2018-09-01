'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _rating = require('./rating.events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RatingSchema = new _mongoose2.default.Schema({
   user: {
      type: _mongoose.Schema.ObjectId,
      ref: 'User'
   },
   order: {
      type: _mongoose.Schema.ObjectId,
      ref: 'Order'
   },
   menuItem: {
      type: _mongoose.Schema.ObjectId,
      ref: 'MenuItem'
   },
   rating: {
      type: Number,
      default: 0
   },
   comment: {
      type: String
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
});

(0, _rating.registerEvents)(RatingSchema);
exports.default = _mongoose2.default.model('Rating', RatingSchema);
//# sourceMappingURL=rating.model.js.map
