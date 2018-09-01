'use strict';

var _auth = require('../../auth/auth.service');

var auth = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var express = require('express');
var controller = require('./menuItem.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
//graph
router.get('/category/menu/', auth.hasRole('admin'), controller.noOfMenuItem);

//List of MenuItems on which offer available
router.get('/offer/available/', auth.hasRole('admin'), controller.offerAvailable);

//Number of MenuItems on which offer available
router.get('/offer/count/', auth.hasRole('admin'), controller.offerCount);

router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.upsert);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/by/category/:id', controller.getByCategory);
//Custom search by menuitem name
router.post('/by/name', controller.customMenuitems);
//get twelve top rated menuitem
router.get('/top/rated/by/rating', controller.topTwelveMenuitemsBasedOnRating);
//Front-end
//recent twelve products
router.get('/recently/added', controller.recentMenuitems);
//sortedmenuitem based on price high to low,low to high,and based on newly arrived
router.post('/sorted', controller.sortedMenuitem);
module.exports = router;
//# sourceMappingURL=index.js.map
