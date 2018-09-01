/**
 * News model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _news = require('./news.model');

var _news2 = _interopRequireDefault(_news);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NewsEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
NewsEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _news2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    NewsEvents.emit(event + ':' + doc._id, doc);
    NewsEvents.emit(event, doc);
  };
}

exports.default = NewsEvents;
//# sourceMappingURL=news.events.js.map
