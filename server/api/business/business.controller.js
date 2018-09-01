/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/businesses              ->  index
 * POST    /api/businesses              ->  create
 * GET     /api/businesses/:id          ->  show
 * PUT     /api/businesses/:id          ->  upsert
 * PATCH   /api/businesses/:id          ->  patch
 * DELETE  /api/businesses/:id          ->  destroy
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

var _business = require('./business.model');

var _business2 = _interopRequireDefault(_business);

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

// Gets a list of Businesss
function index(req, res) {
  _business2.default.findOne().exec(function (err, resdata) {
    if (err) {
      return handleError(err, res);
    }
    if (resdata == null || resdata == undefined) {
      console.log('asdfghjkl.............');
      var blankobo = {};
      res.json(blankobo);
    } else {
      res.json(resdata);
    }
  });
}

// Gets a single Business from the DB
function show(req, res) {
  return _business2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Business in the DB
function create(req, res) {
  return _business2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Upserts the given Business in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _business2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: false }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Business from the DB
function destroy(req, res) {
  return _business2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=business.controller.js.map
