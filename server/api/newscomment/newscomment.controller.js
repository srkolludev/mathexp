/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/newscomments              ->  index
 * POST    /api/newscomments              ->  create
 * GET     /api/newscomments/:id          ->  show
 * PUT     /api/newscomments/:id          ->  upsert
 * PATCH   /api/newscomments/:id          ->  patch
 * DELETE  /api/newscomments/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.index = index;
exports.newscomments = newscomments;
exports.show = show;
exports.create = create;
exports.upsert = upsert;
exports.patch = patch;
exports.destroy = destroy;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _newscomment = require('./newscomment.model');

var _newscomment2 = _interopRequireDefault(_newscomment);

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

// Gets a list of Newscomments
function index(req, res) {
  return _newscomment2.default.find().populate('user newsId', '-salt -password').exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a list of Newscomments
function newscomments(req, res) {
  return _newscomment2.default.find({ 'newsId': req.params.id }, {}).populate('user newsId', '-salt -password').exec().then(respondWithResult(res)).catch(handleError(res));
}
// Gets a single Newscomment from the DB
function show(req, res) {
  return _newscomment2.default.findById(req.params.id).populate('user newsId', '-salt -password').exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Newscomment in the DB
function create(req, res) {
  var newscomment = new _newscomment2.default(req.body);
  newscomment.save(function (err) {
    if (err) {
      return handleError(res);
    } else {
      res.json(newscomment);
    }
  });
}

// Upserts the given Newscomment in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _newscomment2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Updates an existing Newscomment in the DB
function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _newscomment2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(patchUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Newscomment from the DB
function destroy(req, res) {
  return _newscomment2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=newscomment.controller.js.map
