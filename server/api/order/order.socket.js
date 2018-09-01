// /**
//  * Broadcast updates to client when the model changes
//  */

// 'use strict';

// import OrderEvents from './order.events';

// // Model events to emit
// var events = ['save', 'remove'];

// export function register(socket) {
//   // Bind model events to socket events
//   for(var i = 0, eventsLength = events.length; i < eventsLength; i++) {
//     var event = events[i];
//     var listener = createListener(`order:${event}`, socket);

//     OrderEvents.on(event, listener);
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
//     OrderEvents.removeListener(event, listener);
//   };
// }


'use strict';
//var count =1;
//

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.demo = demo;
exports.register = register;
exports.createNotifyListener = createNotifyListener;

var _order = require('./order.events');

var _order2 = _interopRequireDefault(_order);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Model events to emit
var events = {
  save: 'save'
};
var notify;
function demo(receiverSocketId) {
  // Bind model events to socket events
  // receiverSocketIds = receiverSocketId;
  // console.log('Conected array222:' + JSON.stringify(receiverSocketId));
}
function register(socket) {
  // Bind model events to socket events
  var event = events.save;
  var notifyListner = createNotifyListener(socket);
  _order2.default.on(event, notifyListner);
}
function createNotifyListener(socket) {
  return function (doc) {
    socket.emit('notify', doc);
  };
}

function removeListener(socket, event, listener) {
  return function () {
    socket.removeListener(event, listener);
  };
}

// export function ajay(xyz){
// console.log('xyz'+xyz);
// }
//# sourceMappingURL=order.socket.js.map
