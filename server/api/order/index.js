'use strict';

var _auth = require('../../auth/auth.service');

var auth = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var express = require('express');
var controller = require('./order.controller');

var router = express.Router();
//get all order
router.get('/', auth.hasRole('admin'), controller.index);
//get an order
router.get('/:id', auth.isAuthenticated(), controller.show);
//post an order
router.post('/', auth.isAuthenticated(), controller.create);
//update an order
router.put('/:id', auth.isAuthenticated(), controller.upsert);
//GRAPH
router.get('/earning/graph/', auth.hasRole('admin'), controller.earning);
//delete an order
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
//get all orders of a user
router.get('/user/allorders', auth.isAuthenticated(), controller.userOrders);
//user notification
router.get('/user/status/:id', auth.isAuthenticated(), controller.userNotification);

module.exports = router;
//# sourceMappingURL=index.js.map
