/**
 * Newscomment model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEvents = undefined;

var _events = require('events');

var NewscommentEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
NewscommentEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Newscomment) {
  for (var e in events) {
    var event = events[e];
    Newscomment.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc) {
    NewscommentEvents.emit(event + ':' + doc._id, doc);
    NewscommentEvents.emit(event, doc);
  };
}

exports.registerEvents = registerEvents;
exports.default = NewscommentEvents;
//# sourceMappingURL=newscomment.events.js.map
