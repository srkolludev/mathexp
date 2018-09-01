/**
 * Coupon model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEvents = undefined;

var _events = require('events');

var CouponEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
CouponEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Coupon) {
  for (var e in events) {
    var event = events[e];
    Coupon.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc) {
    CouponEvents.emit(event + ':' + doc._id, doc);
    CouponEvents.emit(event, doc);
  };
}

exports.registerEvents = registerEvents;
exports.default = CouponEvents;
//# sourceMappingURL=coupon.events.js.map
