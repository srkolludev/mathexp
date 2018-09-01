/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/addresss              ->  index
 * POST    /api/addresss              ->  create
 * GET     /api/addresss/:id          ->  show
 * PUT     /api/addresss/:id          ->  upsert
 * PATCH   /api/addresss/:id          ->  patch
 * DELETE  /api/addresss/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.index = index;
exports.userAddress = userAddress;
exports.show = show;
exports.create = create;
exports.upsert = upsert;
exports.destroy = destroy;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _address = require('./address.model');

var _address2 = _interopRequireDefault(_address);

var _seed = require('../../config/seed');

var _seed2 = _interopRequireDefault(_seed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cron = require('node-cron');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function (entity) {
    try {
      _fastJsonPatch2.default.apply(entity, patches, /*validate*/true);
    } catch (err) {
      return _promise2.default.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

//REMOVE COMMENTS
//cron job in every 30 minute
//override database by seed db
cron.schedule('*/30 * * * *', function () {
  (0, _seed2.default)();
});

// Gets a list of Addresses
function index(req, res) {
  return _address2.default.find({ 'user': req.user.id }, {}).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a list of Addresses for admin
function userAddress(req, res) {
  return _address2.default.find({ 'user': req.params.id }, {}).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Address from the DB
function show(req, res) {
  return _address2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Address in the DB
function create(req, res) {
  var address = new _address2.default(req.body);
  address.user = req.user.id;
  address.save(function (err) {
    if (err) {
      return handleError(err, res);
    }
    res.json(address);
  });
}

// Upserts the given Address in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  //when not updating primaryAddress
  if (req.body.flag == 0) {
    return _address2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().then(respondWithResult(res)).catch(handleError(res));
  }
  if (req.body.flag == 1) {
    _address2.default.find({ 'user': req.user._id, primaryAddress: 1 }, {}).exec(function (err, address) {
      if (address.length == 0) {
        return _address2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().then(respondWithResult(res)).catch(handleError(res));
      } else {
        address[0].primaryAddress = 0;
      }
      address[0].save(function (err) {
        if (err) {
          return handleError(res);
        } else {
          abc();
        }
      });
      function abc() {
        return _address2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().then(respondWithResult(res)).catch(handleError(res));
      }
    });
  }
}

// Deletes a Address from the DB
function destroy(req, res) {
  return _address2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=address.controller.js.map
