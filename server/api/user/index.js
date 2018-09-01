'use strict';

var _express = require('express');

var _user = require('./user.controller');

var controller = _interopRequireWildcard(_user);

var _auth = require('../../auth/auth.service');

var auth = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = new _express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
//written below route not fetching appropriate data
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/byadmin', auth.hasRole('admin'), controller.createByAdmin);
//get a store info
router.get('/store/info', controller.storeDetails);

router.put('/:id', auth.isAuthenticated(), controller.upsert);

//get (working)
router.post('/stripe/card/info', auth.isAuthenticated(), controller.accCreateAndTrans);
//get (working)
router.post('/stripe/payment', auth.isAuthenticated(), controller.stripePayment);

//**********forgetpassword api******
//for forget password
router.put('/password/forget/', controller.sendResetEmail);
//for reset password
router.put('/password/reset/', controller.ResetPassword);
///>>>>>>> 051819669c48f87ceba558fcd95047eae97ad4d5
module.exports = router;
//# sourceMappingURL=index.js.map
