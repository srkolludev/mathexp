/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/newsletters              ->  index
 * POST    /api/newsletters              ->  create
 * GET     /api/newsletters/:id          ->  show
 * PUT     /api/newsletters/:id          ->  upsert
 * PATCH   /api/newsletters/:id          ->  patch
 * DELETE  /api/newsletters/:id          ->  destroy
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
exports.patch = patch;
exports.destroy = destroy;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _newsletter = require('./newsletter.model');

var _newsletter2 = _interopRequireDefault(_newsletter);

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

// Gets a list of Newsletters
function index(req, res) {
  return _newsletter2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Newsletter from the DB
function show(req, res) {
  return _newsletter2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Newsletter in the DB
function create(req, res) {
  var newsletter = new _newsletter2.default(req.body);
  newsletter.save(function (err) {
    if (err) {
      return handleError(res);
    } else {
      res.json(newsletter);
    }
  });
}

// Upserts the given Newsletter in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _newsletter2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Updates an existing Newsletter in the DB
function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _newsletter2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(patchUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Newsletter from the DB
function destroy(req, res) {
  return _newsletter2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=newsletter.controller.js.map
