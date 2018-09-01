'use strict';

var express = require('express');
var controller = require('./booktable.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();
//get a list of book tables
router.get('/user', auth.isAuthenticated(), controller.index);

//get a list of book tables of a user
router.get('/user/:id', auth.isAuthenticated(), controller.singleUserBookings);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
//# sourceMappingURL=index.js.map
