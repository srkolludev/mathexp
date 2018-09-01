'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _newscomment = require('./newscomment.events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NewscommentSchema = new _mongoose2.default.Schema({
  newsId: {
    type: _mongoose.Schema.ObjectId,
    ref: 'News'
  },
  user: {
    type: _mongoose.Schema.ObjectId,
    ref: 'User'
  },
  email: {
    type: String
  },
  name: {
    type: String
  },
  image: {
    type: String
  },
  comment: {
    type: Array
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

});

(0, _newscomment.registerEvents)(NewscommentSchema);
exports.default = _mongoose2.default.model('Newscomment', NewscommentSchema);
//# sourceMappingURL=newscomment.model.js.map
