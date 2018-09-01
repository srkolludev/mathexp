/**
 * Carddetail model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEvents = undefined;

var _events = require('events');

var CarddetailEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
CarddetailEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Carddetail) {
  for (var e in events) {
    var event = events[e];
    Carddetail.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc) {
    CarddetailEvents.emit(event + ':' + doc._id, doc);
    CarddetailEvents.emit(event, doc);
  };
}

exports.registerEvents = registerEvents;
exports.default = CarddetailEvents;
//# sourceMappingURL=carddetail.events.js.map
