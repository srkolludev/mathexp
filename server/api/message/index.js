// 'use strict';

// var express = require('express');
// var controller = require('./message.controller');

// var router = express.Router();

// router.get('/', controller.index);
// router.get('/:id', controller.show);
// router.post('/', controller.create);
// router.put('/:id', controller.upsert);
// router.patch('/:id', controller.patch);
// router.delete('/:id', controller.destroy);

// module.exports = router;

'use strict';

var express = require('express');
var controller = require('./message.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

//******************AUTH REQUIRED****************************//
//**********************************************************//
//crete a message
router.post('/', auth.isAuthenticated(), controller.create);
//router.get('/:id', auth.isAuthenticated(), controller.messageById);
//router.get('/counts/:flag/', auth.isAuthenticated(), controller.count);

//to get number of unread messages for seller flag should be 1 and for user 0 
router.get('/counts/:flag/', auth.isAuthenticated(), controller.count);

//mark all unread messages of a single seller  to true  
router.get('/mark/read', auth.isAuthenticated(), controller.markRead);
/**************************   User Access  *****************************/
//get a list of seller who had ever contacted through a user
router.get('/', auth.isAuthenticated(), controller.userIndex);

//In below route,:id is sellerID
router.get('/user/:id', auth.isAuthenticated(), controller.userChat);

/**************************   Seller Access  *****************************/
//get a list of user who had ever contacted through a seller
//Micra App - Employee - WF - 26 message detail
router.get('/seller/index/', auth.isAuthenticated(), controller.sellerIndex);
//In below route,:id is userID
//Micra App - Employee - WF - 27 chat page
router.get('/:id', auth.isAuthenticated(), controller.sellerChat);
//DEV
router.get('/update/byseller/:id', auth.isAuthenticated(), controller.updateCount);

module.exports = router;
//# sourceMappingURL=index.js.map
