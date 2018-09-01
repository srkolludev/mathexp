/**
 * Booktable model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEvents = undefined;

var _events = require('events');

var BooktableEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
BooktableEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Booktable) {
  for (var e in events) {
    var event = events[e];
    Booktable.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc) {
    BooktableEvents.emit(event + ':' + doc._id, doc);
    BooktableEvents.emit(event, doc);
  };
}

exports.registerEvents = registerEvents;
exports.default = BooktableEvents;
//# sourceMappingURL=booktable.events.js.map
