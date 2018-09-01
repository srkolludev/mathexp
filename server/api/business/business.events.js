/**
 * Business model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _business = require('./business.model');

var _business2 = _interopRequireDefault(_business);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BusinessEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
BusinessEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _business2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    BusinessEvents.emit(event + ':' + doc._id, doc);
    BusinessEvents.emit(event, doc);
  };
}

exports.default = BusinessEvents;
//# sourceMappingURL=business.events.js.map
