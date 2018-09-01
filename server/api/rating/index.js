'use strict';

var express = require('express');
var controller = require('./rating.controller');

var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:orderId', auth.isAuthenticated(), controller.show);
//All ratings of a menuitem 
router.get('/menuitem/:menuitem', controller.menuitemRating);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.upsert);
router.patch('/:id', auth.isAuthenticated(), controller.patch);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
//# sourceMappingURL=index.js.map
