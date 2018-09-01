/**
 * Wishlist model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEvents = undefined;

var _events = require('events');

var WishlistEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
WishlistEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Wishlist) {
  for (var e in events) {
    var event = events[e];
    Wishlist.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc) {
    WishlistEvents.emit(event + ':' + doc._id, doc);
    WishlistEvents.emit(event, doc);
  };
}

exports.registerEvents = registerEvents;
exports.default = WishlistEvents;
//# sourceMappingURL=wishlist.events.js.map
