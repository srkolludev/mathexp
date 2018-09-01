/**
 * Favourite model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _favourite = require('./favourite.model');

var _favourite2 = _interopRequireDefault(_favourite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FavouriteEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
FavouriteEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _favourite2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    FavouriteEvents.emit(event + ':' + doc._id, doc);
    FavouriteEvents.emit(event, doc);
  };
}

exports.default = FavouriteEvents;
//# sourceMappingURL=favourite.events.js.map
