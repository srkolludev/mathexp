

/**
 * Socket.io configuration
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function (socket) {
    socket.address = socket.request.connection.remoteAddress + ':' + socket.request.connection.remotePort;

    socket.connectedAt = new Date();

    socket.log = function () {
      var _console;

      for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
        data[_key] = arguments[_key];
      }

      (_console = console).log.apply(_console, ['SocketIO ' + socket.nsp.name + ' [' + socket.address + ']'].concat(data));
    };

    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);
      socket.log('DISCONNECTED');
    });

    // Call onConnect.
    onConnect(socket);
    socket.log('CONNECTED');
  });
};

var _environment = require('./environment');

var _environment2 = _interopRequireDefault(_environment);

var _message = require('../api/message/message.model');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoose = require('mongoose');
var clientInfoArray = [];
var receiverSocketId = '';
var sockets = [];
var people = {};
var userIds = [];
// When the user disconnects.. perform this
function onDisconnect(socket) {
  delete people[socket.id];
  // socket.removeAllListeners();
  console.log('spliced');
  sockets.splice(sockets.indexOf(socket), 1);
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  // socket.on('info', data => {
  //   socket.log(JSON.stringify(data, null, 2));
  // });
  socket.on('restaurantInfo', function (data) {
    console.log('HELLO.....Here.......');
    console.log("vconnect" + (0, _stringify2.default)(data));
    sockets.push(socket);
    userIds.push(data.userId);
    people[socket.id] = data.userId;
  });

  socket.on('message', function (data) {
    console.log('user_order$$$$$$$$$$$$$' + (0, _stringify2.default)(data));
    var userId = data.user_id;
    console.log('userId###########' + userId);
    receiverSocketId = findUserByName(userId);
    console.log('receiverSocketId:::' + receiverSocketId);
  });

  //for receiver 
  socket.on('updateSeller', function (data) {
    var i = 0;
    console.log('updateSeller called..................');
    var receiverId = mongoose.Types.ObjectId(data.receiver_id);
    var senderId = mongoose.Types.ObjectId(data.sender_id);
    console.log('receiverId.....' + receiverId);
    console.log('senderId....' + senderId);
    _message2.default.update({ "receiver": receiverId, "sender": senderId, 'receiverRead': false }, { $set: { 'receiverRead': true } }, { 'multi': true }).exec(function (err, message) {
      if (err) {
        return handleError(res, err);
      }
      if (!message) {
        return res.status(404).send('Not Found');
      }

      _message2.default.count({ "receiver": receiverId, "receiverRead": false }).exec(function (err, messages) {
        if (err) {
          return handleError(res, err);
        }
        console.log('messages' + messages);
        socket.emit('updatedCount' + receiverId, messages);
      });
    });
  });

  //for user 
  socket.on('updateUser', function (data) {
    var i = 0;
    var receiverId = data.receiver_id;
    var senderId = data.sender_id;
    _message2.default.update({ "receiver": receiverId, "sender": senderId, 'senderRead': false }, { $set: { 'userRead': true } }, { 'multi': true }).exec(function (err, message) {
      if (err) {
        return handleError(res, err);
      }
      if (!message) {
        return res.status(404).send('Not Found');
      }
      console.log('message***' + (0, _stringify2.default)(message));
      _message2.default.count({ "sender": senderId, "senderRead": false }).exec(function (err, messages) {
        if (err) {
          return handleError(res, err);
        }
        console.log('CountUser====' + messages);
        socket.emit('updatedCount' + data.sender_id, messages);
      });
    });
  });

  //find user by name (
  function findUserByName(userId) {
    console.log('userId---------------' + userId);
    for (var socketID in people) {
      console.log('http' + (0, _stringify2.default)(people[socketID]));
      if (people[socketID] === userId) {
        console.log('socketId-----------' + socketID);
        return test = socketID;
      }
    }
    // return false;
    console.log('not there');
  }
  //require('../api/order/order.socket').ajay('ajay'); 
  // Insert sockets below
  require('../api/newsletter/newsletter.socket').register(socket);
  require('../api/pincode/pincode.socket').register(socket);
  require('../api/newscomment/newscomment.socket').register(socket);
  require('../api/testimonial/testimonial.socket').register(socket);
  require('../api/wishlist/wishlist.socket').register(socket);
  require('../api/carddetail/carddetail.socket').register(socket);
  require('../api/contact/contact.socket').register(socket);
  require('../api/booktable/booktable.socket').register(socket);
  require('../api/rating/rating.socket').register(socket);
  require('../api/address/address.socket').register(socket);
  //require('../api/order/Order.socket').register(socket);
  require('../api/notification/notification.socket').register(socket);
  require('../api/message/message.socket').register(socket);
  require('../api/upcoming/upcoming.socket').register(socket);
  require('../api/coupon/coupon.socket').register(socket);
  require('../api/favourite/favourite.socket').register(socket);
  require('../api/news/news.socket').register(socket);
  require('../api/setting/setting.socket').register(socket);
  // require('../api/image/image.socket').register(socket);
  require('../api/order/order.socket').register(socket);
  require('../api/business/business.socket').register(socket);
  require('../api/tag/tag.socket').register(socket);
  require('../api/menuItem/menuItem.socket').register(socket);
  require('../api/category/category.socket').register(socket);
}
//# sourceMappingURL=socketio.js.map
