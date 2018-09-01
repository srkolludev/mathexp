/**
 * Testimonial model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEvents = undefined;

var _events = require('events');

var TestimonialEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
TestimonialEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Testimonial) {
  for (var e in events) {
    var event = events[e];
    Testimonial.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc) {
    TestimonialEvents.emit(event + ':' + doc._id, doc);
    TestimonialEvents.emit(event, doc);
  };
}

exports.registerEvents = registerEvents;
exports.default = TestimonialEvents;
//# sourceMappingURL=testimonial.events.js.map
