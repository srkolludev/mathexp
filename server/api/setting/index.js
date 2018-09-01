'use strict';

var _auth = require('../../auth/auth.service');

var auth = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var express = require('express');
var controller = require('./setting.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
//router.post('/',auth.hasRole('admin'),controller.create);
//router.put('/:id', auth.hasRole('admin'),controller.upsert);
//router.delete('/:id', auth.hasRole('admin'),controller.destroy);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.delete('/:id', controller.destroy);

module.exports = router;
//# sourceMappingURL=index.js.map
