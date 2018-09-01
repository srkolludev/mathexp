/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/wishlists              ->  index
 * POST    /api/wishlists              ->  create
 * GET     /api/wishlists/:id          ->  show
 * PUT     /api/wishlists/:id          ->  upsert
 * PATCH   /api/wishlists/:id          ->  patch
 * DELETE  /api/wishlists/:id          ->  destroy
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
exports.destroy = destroy;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _wishlist = require('./wishlist.model');

var _wishlist2 = _interopRequireDefault(_wishlist);

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

// Gets a list of Wishlists
function index(req, res) {
  return _wishlist2.default.find({ 'user': req.user._id }, {}).populate('productId').exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Wishlist from the DB
function show(req, res) {
  return _wishlist2.default.findById(req.params.id).populate('productId').exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Wishlist in the DB
function create(req, res) {
  var wishlist = new _wishlist2.default();
  wishlist.user = req.user._id;
  wishlist.productId = req.body.product;
  wishlist.save(function (err) {
    if (err) {
      return handleError(err, res);
    } else {
      res.json(wishlist);
    }
  });
}

// Deletes a Wishlist from the DB
function destroy(req, res) {
  return _wishlist2.default.findOne({ 'productId': req.params.id, 'user': req.user._id }).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=wishlist.controller.js.map
