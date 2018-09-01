/**
 * Pincode model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEvents = undefined;

var _events = require('events');

var PincodeEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
PincodeEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Pincode) {
  for (var e in events) {
    var event = events[e];
    Pincode.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc) {
    PincodeEvents.emit(event + ':' + doc._id, doc);
    PincodeEvents.emit(event, doc);
  };
}

exports.registerEvents = registerEvents;
exports.default = PincodeEvents;
//# sourceMappingURL=pincode.events.js.map
