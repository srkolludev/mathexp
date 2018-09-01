'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _auth = require('../auth.service');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var util = require('util');
var router = _express2.default.Router();

router.post('/', function (req, res, next) {
  _passport2.default.authenticate('local', function (err, user, info) {
    //console.log(util.inspect(req, {showHidden: false, depth: null}));
    var error = err || info;
    if (error) {
      return res.status(401).json(error);
    }
    if (!user) {
      return res.status(404).json({ message: 'Something went wrong, please try again.' });
    }

    var token = (0, _auth.signToken)(user._id, user.role);
    var out = {};
    out["token"] = token;
    out["_id"] = user._id;
    out["name"] = user.name;
    out["role"] = user.role;
    out["email"] = user.email;
    //console.log(util.inspect(token, {showHidden: false, depth: null}));
    res.json(out);
  })(req, res, next);
});

exports.default = router;
//# sourceMappingURL=index.js.map
