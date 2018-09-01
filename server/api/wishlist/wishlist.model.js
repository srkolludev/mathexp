'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _wishlist = require('./wishlist.events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WishlistSchema = new _mongoose2.default.Schema({
  user: {
    type: _mongoose.Schema.ObjectId,
    ref: 'User'
  },
  productId: {
    type: _mongoose.Schema.ObjectId,
    ref: 'Product'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

(0, _wishlist.registerEvents)(WishlistSchema);
exports.default = _mongoose2.default.model('Wishlist', WishlistSchema);
//# sourceMappingURL=wishlist.model.js.map
