'use strict';

var _express = require('express');

var _question = require('./question.controller');

var controller = _interopRequireWildcard(_question);

var _auth = require('../../auth/auth.service');

var auth = _interopRequireWildcard(_auth);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = new _express.Router();
//run the authentication and based on the role return the questions
router.get('/user', auth.hasRole(['master', "admin"]), controller.getQnsByUserId);

//run the authentication and based on the role return the question
router.get('/test', controller.getEndUserQnsByQnId);

router.get('/opts/:id/:opt', auth.hasRole(['editor']), controller.getQnByQnId);

//run the authentication and based on the role return the question
//router.get('/hist/:id', auth.hasRole('editor'), controller.getQnHistByQnId);

//generate and return, generate and save history return
//router.post('/hist', auth.hasAnyRole(['editor',"super","admin","super"]), controller.setQnHistory);
router.post('/hist', auth.hasRole(['editor']), controller.setQnHistory);

//test
router.get('/', auth.hasRole(['master', "admin"]), controller.getQns);

router.put('/', auth.hasRole(['master', "admin"]), controller.upsert);

router.post('/', auth.hasRole(['master', "admin"]), controller.create);

router.delete('/', auth.hasRole(['master', "admin"]), controller.deleteQn);

//all
router.get('/sct/:id', controller.getEndUserQnsBySctId);

//get questions by search type and id, grade, sct, 
router.post('/search', auth.hasRole(['master']), controller.getQnsBySearchParams);

router.post('/scheme', controller.getQnsBySchemeParams);

//router.delete('/:id', controller.destroyQn);

//router.put('/:id', controller.upsertQn);

module.exports = router;
//# sourceMappingURL=index.js.map
