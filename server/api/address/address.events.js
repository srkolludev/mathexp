/**
 * Address model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEvents = undefined;

var _events = require('events');

var AddressEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
AddressEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Address) {
  for (var e in events) {
    var event = events[e];
    Address.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc) {
    AddressEvents.emit(event + ':' + doc._id, doc);
    AddressEvents.emit(event, doc);
  };
}

exports.registerEvents = registerEvents;
exports.default = AddressEvents;
//# sourceMappingURL=address.events.js.map
