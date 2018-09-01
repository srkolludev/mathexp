'use strict';

var _auth = require('../../auth/auth.service');

var auth = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var express = require('express');
var controller = require('./favourite.controller');


var router = express.Router();
router.get('/', auth.hasRole('admin'), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.upsert);
//List of menuItem liked by a user
router.get('/user/fav/', auth.isAuthenticated(), controller.userFav);
//delete a favourite
router.post('/delete', auth.isAuthenticated(), controller.destroy);
//check whether menuItem is favourite or not
router.post('/check', auth.isAuthenticated(), controller.checkFavourite);
module.exports = router;
//# sourceMappingURL=index.js.map
