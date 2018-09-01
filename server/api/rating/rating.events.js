/**
 * Rating model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEvents = undefined;

var _events = require('events');

var RatingEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
RatingEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Rating) {
  for (var e in events) {
    var event = events[e];
    Rating.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc) {
    RatingEvents.emit(event + ':' + doc._id, doc);
    RatingEvents.emit(event, doc);
  };
}

exports.registerEvents = registerEvents;
exports.default = RatingEvents;
//# sourceMappingURL=rating.events.js.map
