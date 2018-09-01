/**
 * Contact model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEvents = undefined;

var _events = require('events');

var ContactEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
ContactEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Contact) {
  for (var e in events) {
    var event = events[e];
    Contact.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc) {
    ContactEvents.emit(event + ':' + doc._id, doc);
    ContactEvents.emit(event, doc);
  };
}

exports.registerEvents = registerEvents;
exports.default = ContactEvents;
//# sourceMappingURL=contact.events.js.map
