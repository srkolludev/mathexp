/**
 * Notification model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEvents = undefined;

var _events = require('events');

var NotificationEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
NotificationEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Notification) {
  for (var e in events) {
    var event = events[e];
    Notification.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc) {
    NotificationEvents.emit(event + ':' + doc._id, doc);
    NotificationEvents.emit(event, doc);
  };
}

exports.registerEvents = registerEvents;
exports.default = NotificationEvents;
//# sourceMappingURL=notification.events.js.map
