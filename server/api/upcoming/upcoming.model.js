'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _upcoming = require('./upcoming.events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UpcomingSchema = new _mongoose2.default.Schema({
  //info about upcoming foods
  title: {
    type: String
  },
  thumb: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

(0, _upcoming.registerEvents)(UpcomingSchema);
exports.default = _mongoose2.default.model('Upcoming', UpcomingSchema);
//# sourceMappingURL=upcoming.model.js.map
