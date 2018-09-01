'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FavouriteSchema = new _mongoose2.default.Schema({
  //This field value always would be in upper case(LIKE,DISLIKE)
  userReaction: {
    type: String
  },
  user: {
    type: _mongoose.Schema.ObjectId,
    ref: 'User'
  },
  menuItem: {
    type: _mongoose.Schema.ObjectId,
    ref: 'MenuItem'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

exports.default = _mongoose2.default.model('Favourite', FavouriteSchema);
//# sourceMappingURL=favourite.model.js.map
