/**
 * Upcoming model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEvents = undefined;

var _events = require('events');

var UpcomingEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
UpcomingEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Upcoming) {
  for (var e in events) {
    var event = events[e];
    Upcoming.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc) {
    UpcomingEvents.emit(event + ':' + doc._id, doc);
    UpcomingEvents.emit(event, doc);
  };
}

exports.registerEvents = registerEvents;
exports.default = UpcomingEvents;
//# sourceMappingURL=upcoming.events.js.map
