/**
 * Newsletter model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEvents = undefined;

var _events = require('events');

var NewsletterEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
NewsletterEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Newsletter) {
  for (var e in events) {
    var event = events[e];
    Newsletter.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc) {
    NewsletterEvents.emit(event + ':' + doc._id, doc);
    NewsletterEvents.emit(event, doc);
  };
}

exports.registerEvents = registerEvents;
exports.default = NewsletterEvents;
//# sourceMappingURL=newsletter.events.js.map
