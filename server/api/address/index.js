'use strict';
//Cron api(seed db)into address controller

var express = require('express');
var controller = require('./address.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

//******************AUTH REQUIRED********************//
//**************************************************//

//for all store/employee/user
router.get('/user', auth.isAuthenticated(), controller.index);

//for all store/employee/user
router.get('/user/:id', auth.isAuthenticated(), controller.userAddress);
//get a single address
router.get('/:id', auth.isAuthenticated(), controller.show);
//post  address
router.post('/', auth.isAuthenticated(), controller.create);
//update address
router.put('/:id', auth.isAuthenticated(), controller.upsert);
//delete address
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
//# sourceMappingURL=index.js.map
