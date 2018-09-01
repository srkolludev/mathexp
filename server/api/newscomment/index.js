'use strict';

var express = require('express');
var controller = require('./newscomment.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.upsert);
router.patch('/:id', auth.isAuthenticated(), controller.patch);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/news/:id', controller.newscomments);
module.exports = router;
//# sourceMappingURL=index.js.map
