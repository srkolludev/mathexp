/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/settings              ->  index
 * POST    /api/settings              ->  create
 * GET     /api/settings/:id          ->  show
 * PUT     /api/settings/:id          ->  upsert
 * PATCH   /api/settings/:id          ->  patch
 * DELETE  /api/settings/:id          ->  destroy 
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

var _setting = require('./setting.model');

var _setting2 = _interopRequireDefault(_setting);

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
    if (err) {
      var errMessage = '';

      // go through all the errors...
      for (var errName in err.errors) {
        switch (err.errors[errName].type) {
          case 'required':
            errMessage = 'Field is required';
            break;
          case 'notvalid':
            errMessage = 'Field is not valid';
            break;
          default:
            console.log(err.errors[errName].type);
            errMessage = 'Other field error';
            break;
        }
      }
      res.status(statusCode).send(errMessage);
    }
  };
}

// Gets a list of Settings
function index(req, res) {
  return _setting2.default.findOne().exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Setting from the DB
function show(req, res) {
  return _setting2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Setting in the DB
function create(req, res) {
  return _setting2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Upserts the given Setting in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _setting2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Setting from the DB
function destroy(req, res) {
  return _setting2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=setting.controller.js.map
