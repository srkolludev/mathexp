// /**
//  * Order model events
//  */

// 'use strict';

// import {EventEmitter} from 'events';
// import Order from './order.model';
// var OrderEvents = new EventEmitter();

// // Set max event listeners (0 == unlimited)
// OrderEvents.setMaxListeners(0);

// // Model events
// var events = {
//   save: 'save',
//   remove: 'remove'
// };

// // Register the event emitter to the model events
// for(var e in events) {
//   let event = events[e];
//   Order.schema.post(e, emitEvent(event));
// }

// function emitEvent(event) {
//   return function(doc) {
//     OrderEvents.emit(event + ':' + doc._id, doc);
//     OrderEvents.emit(event, doc);
//   };
// }

// export default OrderEvents;


/**
 * Orders model events
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEvents = undefined;

var _events = require('events');

var _order = require('./order.model');

var _order2 = _interopRequireDefault(_order);

var _notification = require('../notification/notification.model');

var _notification2 = _interopRequireDefault(_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrderEvents = new _events.EventEmitter();
var UserEvents = new _events.EventEmitter();


//var userEvents = new EventEmitter();
console.log('hello@@@@@@');
// Set max event listeners (0 == unlimited)
OrderEvents.setMaxListeners(0);
UserEvents.setMaxListeners(0);
// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Orders) {
  for (var e in events) {
    var event = events[e];
    console.log('hello');
    console.log(event + "---------event-----------");
    Orders.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc) {
    //console.log(doc +'-----------------------------------------')
    var notification = new _notification2.default();
    notification.order = doc._id;
    notification.orderID = doc.orderID;
    notification.priceGrandTotal = doc.grandTotal;
    notification.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: 'Something Wrong'
        });
      } else {
        var notifyObj = {
          _id: notification._id,
          readNotification: notification.readNotification,
          order: doc._id,
          orderID: doc.orderID,
          priceGrandTotal: doc.grandTotal,
          createdAt: doc.createdAt
        };
        console.log('hello000000');
        //UserEvents.emit('notify',notifyObj);
        OrderEvents.emit(event, notifyObj);
      }
    });
    // OrderEvents.emit(event + ':' + doc._id, doc);
    // OrderEvents.emit(event, doc);
  };
}

exports.registerEvents = registerEvents;
exports.default = OrderEvents;
//# sourceMappingURL=order.events.js.map
