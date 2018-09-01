'use strict';

var _auth = require('../../auth/auth.service');

var auth = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var express = require('express');
var controller = require('./news.controller');


var router = express.Router();
//get all news
router.get('/', controller.index);
//get a single news
router.get('/:id', controller.show);
//post a news
router.post('/', auth.hasRole('admin'), controller.create);
//update a news
router.put('/:id', auth.hasRole('admin'), controller.upsert);
//delete a news
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
//Custom search by news title
router.post('/by/title', controller.customTitle);

module.exports = router;
//# sourceMappingURL=index.js.map
