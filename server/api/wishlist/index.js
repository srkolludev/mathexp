'use strict';

var express = require('express');
var controller = require('./wishlist.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/user', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
//# sourceMappingURL=index.js.map
