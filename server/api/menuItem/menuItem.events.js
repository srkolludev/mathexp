/**
 * MenuItem model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _menuItem = require('./menuItem.model');

var _menuItem2 = _interopRequireDefault(_menuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuItemEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
MenuItemEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _menuItem2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    MenuItemEvents.emit(event + ':' + doc._id, doc);
    MenuItemEvents.emit(event, doc);
  };
}

exports.default = MenuItemEvents;
//# sourceMappingURL=menuItem.events.js.map
