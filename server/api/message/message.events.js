// /**
//  * Message model events
//  */

// 'use strict';

// import {EventEmitter} from 'events';
// var MessageEvents = new EventEmitter();

// // Set max event listeners (0 == unlimited)
// MessageEvents.setMaxListeners(0);

// // Model events
// var events = {
//   save: 'save',
//   remove: 'remove'
// };

// // Register the event emitter to the model events
// function registerEvents(Message) {
//   for(var e in events) {
//     let event = events[e];
//     Message.post(e, emitEvent(event));
//   }
// }

// function emitEvent(event) {
//   return function(doc) {
//     MessageEvents.emit(event + ':' + doc._id, doc);
//     MessageEvents.emit(event, doc);
//   };
// }

// export {registerEvents};
// export default MessageEvents;
/**
 * Message model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEvents = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _events = require('events');

var _message = require('./message.model');

var _message2 = _interopRequireDefault(_message);

var _user = require('../user/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MessageEvents = new _events.EventEmitter();
var userEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
MessageEvents.setMaxListeners(0);
userEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};
// Register the event emitter to the model events
function registerEvents(Message) {
  for (var e in events) {
    var event = events[e];
    Message.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc) {
    var dataObj = {};
    var count = 0;
    if (doc.sentBy == 'receiver') {
      _message2.default.find({ "sender": doc.sender, "receiver": doc.receiver }).exec(function (err, messages) {
        for (var i = 0; i < messages.length; i++) {
          if (messages[i].userRead === false) {
            count++;
          }
        }
        dataObj = {
          id: doc.sender,
          count: count
        };
      });
    }
    if (doc.sentBy == 'sender') {
      _message2.default.find({ "receiver": doc.receiver, "sender": doc.sender }).exec(function (err, messages) {
        for (var i = 0; i < messages.length; i++) {
          if (messages[i].receiverRead === false) {
            count++;
          }
        }
        _user2.default.findById(doc.sender).exec(function (err, data) {
          if (err) {
            res, status(400).send({
              message: 'Bad request.'
            });
          } else {
            console.log('docfile------------------' + (0, _stringify2.default)(doc));
            dataObj = {
              _id: doc.sender,
              receiver: doc.receiver,
              name: data.name,
              count: count,
              timestamp: doc.timestamp,
              lastMessage: doc.message,
              fileUrl: doc.fileUrl,
              fileName: doc.fileName,
              fileType: doc.fileType
              //email:data.email,
              //name:data.name
            };
            MessageEvents.emit(event, dataObj);
          }
        });
      });
    }
    MessageEvents.emit(event + ':' + doc._id, doc);
    MessageEvents.emit(event, doc);
  };
}

exports.registerEvents = registerEvents;
exports.default = MessageEvents;

/**
* Message model events
*/
//# sourceMappingURL=message.events.js.map
