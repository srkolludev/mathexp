'use strict';

var express = require('express');
var controller = require('./carddetail.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();
//get a list of customerIds of a user
router.get('/user', auth.isAuthenticated(), controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
//# sourceMappingURL=index.js.map
