/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/pincodes              ->  index
 * POST    /api/pincodes              ->  create
 * GET     /api/pincodes/:id          ->  show
 * PUT     /api/pincodes/:id          ->  upsert
 * PATCH   /api/pincodes/:id          ->  patch
 * DELETE  /api/pincodes/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.index = index;
exports.show = show;
exports.create = create;
exports.upsert = upsert;
exports.destroy = destroy;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _pincode = require('./pincode.model');

var _pincode2 = _interopRequireDefault(_pincode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

// Gets a list of Pincodes
function index(req, res) {
  return _pincode2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Pincode from the DB
function show(req, res) {
  return _pincode2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Pincode in the DB
function create(req, res) {
  var pincode = new _pincode2.default(req.body);
  pincode.save(function (err) {
    if (err) {
      return handleError(res);
    } else {
      res.json(pincode);
    }
  });
}

// Upserts the given Pincode in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _pincode2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Pincode from the DB
function destroy(req, res) {
  return _pincode2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=pincode.controller.js.map
