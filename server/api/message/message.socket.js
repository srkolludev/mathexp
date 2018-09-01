// /**
//  * Broadcast updates to client when the model changes
//  */

// 'use strict';

// import MessageEvents from './message.events';

// // Model events to emit
// var events = ['save', 'remove'];

// export function register(socket) {
//   // Bind model events to socket events
//   for(var i = 0, eventsLength = events.length; i < eventsLength; i++) {
//     var event = events[i];
//     var listener = createListener(`message:${event}`, socket);

//     MessageEvents.on(event, listener);
//     socket.on('disconnect', removeListener(event, listener));
//   }
// }


// function createListener(event, socket) {
//   return function(doc) {
//     socket.emit(event, doc);
//   };
// }

// function removeListener(event, listener) {
//   return function() {
//     MessageEvents.removeListener(event, listener);
//   };
// }
'use strict';
//var count =1;
//
//var dateAndTime = 0;

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.demo = demo;
exports.register = register;
exports.createNotifyListener = createNotifyListener;
exports.createListener = createListener;

var _message = require('./message.events');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Model events to emit
var events = {
  save: 'save'
};
var notify;
var data = [];
var receiverSocketIds = '';
function demo(receiverSocketId) {
  // Bind model events to socket events
  // receiverSocketIds = receiverSocketId;
  // console.log('Conected array222:' + JSON.stringify(receiverSocketId));
}
function register(socket) {
  var event = events.save;
  var listener = createListener(socket);
  var notifyListner = createNotifyListener(socket);
  _message2.default.on(event, listener);
  _message2.default.on(event, notifyListner);
  socket.on('disconnect', removeListener(socket, event, listener));
}

function createNotifyListener(socket) {
  return function (doc) {
    socket.SocketId = receiverSocketIds;
    if (doc.count > 0) {
      console.log('notify' + (0, _stringify2.default)(doc));
      socket.emit('notify' + doc.receiver, doc);
    }
  };
}

function createListener(socket) {
  return function (doc) {
    socket.SocketId = receiverSocketIds;
    if (doc.sentBy == 'sender') {
      console.log('doc' + (0, _stringify2.default)(doc));
      socket.emit('message' + doc.receiver, doc);
    } else {
      console.log('doc...' + (0, _stringify2.default)(doc));
      socket.emit('message' + doc.sender, doc);
    }
  };
}

function removeListener(socket, event, listener) {
  return function () {
    socket.removeListener(event, listener);
  };
}
//# sourceMappingURL=message.socket.js.map
