
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.userIndex = userIndex;
exports.userChat = userChat;
exports.sellerIndex = sellerIndex;
exports.updateCount = updateCount;
exports.sellerChat = sellerChat;
exports.count = count;
exports.create = create;
exports.markRead = markRead;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _message = require('./message.model');

var _message2 = _interopRequireDefault(_message);

var _user = require('../user/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function (entity) {
    try {
      _fastJsonPatch2.default.apply(entity, patches, /*validate*/true);
    } catch (err) {
      return _promise2.default.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

/**************************   User Access  *****************************/

///////////////////
//get a list of seller who had ever contacted through a user
function userIndex(req, res, user) {
  var result = [];
  var flag = 0;
  var setValue = 1;
  var slot;
  var senderId = req.user._id;
  var newObj = {};
  var newArray = [];
  _message2.default.find({ 'sender': senderId }).distinct('receiver').exec(function (err, messages) {
    if (err) {
      return handleError(err, res);
    }
    if (messages.length == 0) {
      return res.status(404).send({
        message: 'You do not have any seller who contacted you atleast once.'
      });
    } else {
      var _loop = function _loop(i) {
        _message2.default.find({ 'receiver': messages[i], 'sender': senderId }).exec(function (err, lastMsg) {
          if (err) {
            return handleError(err, res);
          } else {
            var lastSellerMsgIndex = lastMsg.length - 1;
            var lastMsgData = lastMsg[lastSellerMsgIndex].message;
            _user2.default.findById(messages[i], { storeName: 1, email: 1 }).exec(function (err, users) {
              if (err) {
                return handleError(err, res);
              } else {
                result.push(users);
                if (result.length === messages.length) {
                  var _loop2 = function _loop2(j) {
                    _message2.default.count({ 'sender': senderId, 'receiver': messages[j], "senderRead": false }).exec(function (err, count) {
                      if (err) {
                        return handleError(err, res);
                      } else {
                        for (var k = 0; k < messages.length; k++) {
                          var x = result[k]._id.toString();
                          var y = messages[j].toString();
                          if (x === y) {
                            flag++;
                            newObj = {
                              lastMessage: lastMsgData,
                              _id: result[k]._id,
                              storeName: result[k].storeName,
                              email: result[k].email,
                              count: count
                            };
                            newArray.push(newObj);
                          }
                          if (flag === messages.length && setValue === 1) {
                            res.json(newArray);
                            setValue = 0;
                          }
                        }
                      }
                    });
                  };

                  for (var j = 0; j < messages.length; j++) {
                    _loop2(j);
                  }
                }
              }
            });
          }
        });
      };

      for (var i = 0; i < messages.length; i++) {
        _loop(i);
      }
    }
  });
}

// Gets all Messages from the DB of a user and seller(for user only)
function userChat(req, res) {
  var senderId = req.user._id;
  var receiverId = req.params.id;

  return _message2.default.find({ "sender": senderId, "receiver": receiverId }).sort([['createdAt', 1]]).populate('user seller', 'name email').exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

/**************************   Seller Access  *****************************/

////////////////////////////DEVELOPING///////////////////////


//get a list of user who had ever contacted through a seller
function sellerIndex(req, res, user) {
  var result = [];
  var flag = 0;
  var setValue = 1;
  var slot;
  var receiverId = req.user._id;
  var newObj = {};
  var newArray = [];
  _message2.default.find({ 'receiver': receiverId }).distinct('sender').exec(function (err, messages) {
    if (err) {
      return handleError(err, res);
    }
    if (messages.length == 0) {
      return res.send({
        message: 'You do not have any user who contacted you atleast once.'
      });
    } else {
      for (var i = 0; i < messages.length; i++) {
        _user2.default.findById(messages[i], { name: 1, email: 1, imageUrl: 1 }).exec(function (err, users) {
          if (err) {
            return handleError(err, res);
          } else {
            result.push(users);
            if (result.length === messages.length) {
              var _loop3 = function _loop3(j) {
                _message2.default.count({ 'receiver': receiverId, 'sender': messages[j], "receiverRead": false }).exec(function (err, count) {
                  if (err) {
                    return handleError(err, res);
                  } else {
                    _message2.default.find({ 'receiver': receiverId, 'sender': messages[j] }).exec(function (err, lastMsg) {
                      if (err) {
                        return handleError(err, res);
                      } else {
                        var lastUserMsgIndex = lastMsg.length - 1;
                        var lastMsgData = lastMsg[lastUserMsgIndex].message;
                        var lastmsgTime = lastMsg[lastUserMsgIndex].createdAt;
                        for (var k = 0; k < messages.length; k++) {
                          console.log((0, _stringify2.default)(result[k]) + "result");
                          if (result[k] != null) {
                            var x = result[k]._id.toString();
                            var y = messages[j].toString();
                          }
                          if (x === y) {
                            flag++;
                            if (result[k] != null) {
                              newObj = {
                                lastMessage: lastMsgData,
                                _id: result[k]._id,
                                name: result[k].name,
                                email: result[k].email,
                                imageUrl: result[k].imageUrl,
                                count: count,
                                lastmsgTime: lastmsgTime
                              };
                            }
                            newArray.push(newObj);
                          }
                          if (flag === messages.length && setValue === 1) {
                            newArray.sort(function (a, b) {
                              return b.lastmsgTime - a.lastmsgTime;
                            });
                            res.json(newArray);
                            setValue = 0;
                          }
                        }
                      }
                    });
                  }
                });
              };

              for (var j = 0; j < messages.length; j++) {
                _loop3(j);
              }
            }
          }
        });
      }
    }
  });
}

///////////////////////////////////////////////
//for seller
function updateCount(req, res) {
  var i = 0;
  var mongoose = require('mongoose');
  var receiverId = mongoose.Types.ObjectId(req.user._id);
  var senderId = mongoose.Types.ObjectId(req.params.id);
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
      res.json(messages);
    });
  });
  //  }
  //  if(i === message.length)
  //  {
  //    Message.count({"receiver":receiverId,"receiverRead":false}).exec(function (err, messages) {
  //      if (err) {
  //        return handleError(res, err);
  //      }
  //      if (!messages) {
  //        return res.json(0);
  //      }
  //      res.json(messages);
  //    });
  //  }
  // });
}

// Gets all Messages from the DB of a user and seller(for seller only)
function sellerChat(req, res) {
  var receiverId = req.user._id;
  var senderId = req.params.id;
  _message2.default.find({ "sender": senderId, "receiver": receiverId }).sort([['createdAt', 1]]).exec(function (err, msgs) {
    if (err) {
      return handleError(err, res);
    } else {
      //res.json(msgs);
      _user2.default.findById(senderId, 'name email imageUrl').exec(function (err, sender) {
        if (err) {
          return handleError(err, res);
        } else {
          _user2.default.findById(receiverId, 'name email imageUrl').exec(function (err, receiver) {
            if (err) {
              return handleError(err, res);
            } else {
              var resData = {
                sender: sender,
                receiver: receiver,
                messages: msgs
              };
              res.json(resData);
            }
          });
        }
      });
    }
  });
}

// //GET NUMBER OF UNREAD MESSAGES BY SELLER AND USER ID
// export function count(req, res) {
//   var count = 0;
//   var Id = req.user._id;
//   var flag = req.params.flag;
//   //to get seller unread
//   if(flag == 1) 
//   { 
//     Message.find({"receiver":Id}).exec(function (err, messages){
//       for (var i = 0; i < messages.length; i++) {
//         if(messages[i].receiverRead === false)
//         {
//           count++;
//         }
//       }
//       res.json(count);
//     });
//   }
//   //to get user unread
//   if(flag == 0)
//   {

//     Message.find({"sender":Id}).exec(function (err, messages){
//       for (var i = 0; i < messages.length; i++) {
//         if(messages[i].senderRead == false)
//         {
//           count++;
//         }
//       }
//       res.json(count);
//     });
//   }
// }
//GET NUMBER OF UNREAD MESSAGES BY SELLER AND USER ID
function count(req, res) {
  var count = 0;
  var Id = req.user._id;
  var flagval = req.params.flag;
  //to get seller unread
  if (flagval == 1) {
    var result = [];
    var flag = 0;
    var setValue = 1;
    var slot;
    var receiverId = req.user._id;
    var newObj = {};
    var newArray = [];
    _message2.default.find({ 'receiver': receiverId }).distinct('sender').exec(function (err, messages) {
      if (err) {
        return res.status(400).send({
          message: 'Something went Wrong.'
        });
      }
      if (messages.length == 0) {
        return res.send({
          message: 'You do not have any user who contacted you atleast once.'
        });
      } else {
        for (var i = 0; i < messages.length; i++) {
          _user2.default.findById(messages[i], { name: 1, email: 1 }).exec(function (err, users) {
            if (err) {
              return res.status(400).send({
                message: 'Something Wrong'
              });
            } else {
              result.push(users);
              if (result.length === messages.length) {
                var _loop4 = function _loop4(j) {
                  _message2.default.count({ 'receiver': receiverId, 'sender': messages[j], "receiverRead": false }).exec(function (err, count) {
                    if (err) {
                      return res.status(400).send({
                        message: 'Something Wrong'
                      });
                    } else {
                      _message2.default.find({ 'receiver': receiverId, 'sender': messages[j] }).exec(function (err, lastMsg) {
                        if (err) {
                          res.send({
                            message: 'Error occured.'
                          });
                        } else {
                          var lastUserMsgIndex = lastMsg.length - 1;
                          var lastMsgData = lastMsg[lastUserMsgIndex].message;
                          var lastmsgTime = lastMsg[lastUserMsgIndex].createdAt;
                          for (var k = 0; k < messages.length; k++) {
                            console.log((0, _stringify2.default)(result[k]) + "result");
                            if (result[k] != null) {
                              var x = result[k]._id.toString();
                              var y = messages[j].toString();
                            }
                            if (x === y) {
                              flag++;
                              if (result[k] != null) {
                                newObj = {
                                  lastMessage: lastMsgData,
                                  _id: result[k]._id,
                                  name: result[k].name,
                                  email: result[k].email,
                                  count: count,
                                  lastmsgTime: lastmsgTime
                                };
                              }
                              if (newObj.count > 0) {
                                newArray.push(newObj);
                              }
                            }
                            if (flag === messages.length && setValue === 1) {
                              newArray.sort(function (a, b) {
                                return b.lastmsgTime - a.lastmsgTime;
                              });
                              res.json(newArray);
                              setValue = 0;
                            }
                          }
                        }
                      });
                    }
                  });
                };

                for (var j = 0; j < messages.length; j++) {
                  _loop4(j);
                }
              }
            }
          });
        }
      }
    });
  }
  //to get user unread
  if (flagval == 0) {

    _message2.default.find({ "sender": Id }).exec(function (err, messages) {
      for (var i = 0; i < messages.length; i++) {
        if (messages[i].senderRead == false) {
          count++;
        }
      }
      res.json(count);
    });
  }
}
// Creates a new Message in the DB
function create(req, res) {
  console.log("req.body--------" + (0, _stringify2.default)(req.body));
  var senderId = req.body.sender;
  var receiverId = req.body.receiver;
  var message = new _message2.default();
  message.timestamp = Date.parse(new Date());
  message.sender = senderId;
  message.receiver = receiverId;
  if (req.body.sentBy == 'sender') {
    message.receiverRead = false;
  }
  if (req.body.sentBy == 'receiver') {
    message.senderRead = false;
  }
  if (req.body.fileUrl != undefined) {
    message.fileUrl = req.body.fileUrl;
    message.fileType = req.body.fileType;
    message.fileName = req.body.fileName;
  }
  // message.sendTo = req.body.sendTo;
  message.message = req.body.message;
  message.sentBy = req.body.sentBy;
  // Save Message 
  message.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: 'Something Wrong'
      });
    } else {
      res.json(message);
    }
  });
}

//Mark all as read(only for seller)
function markRead(req, res) {
  var receiverId = req.user._id;
  _message2.default.update({ "receiver": receiverId, 'receiverRead': false }, { $set: { 'receiverRead': true } }, { 'multi': true }).exec(function (err, message) {
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
      res.json(messages);
    });
  });
}
//# sourceMappingURL=message.controller.js.map
