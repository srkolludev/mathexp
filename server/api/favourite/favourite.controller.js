/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/favourites              ->  index
 * POST    /api/favourites              ->  create
 * GET     /api/favourites/:id          ->  show
 * PUT     /api/favourites/:id          ->  upsert
 * PATCH   /api/favourites/:id          ->  patch
 * DELETE  /api/favourites/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.index = index;
exports.show = show;
exports.userFav = userFav;
exports.create = create;
exports.upsert = upsert;
exports.destroy = destroy;
exports.checkFavourite = checkFavourite;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _favourite = require('./favourite.model');

var _favourite2 = _interopRequireDefault(_favourite);

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
        return res.status(204).end();
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
    console.log('err' + err);
    res.status(statusCode).send(err);
  };
}

// Gets a list of Favourites
function index(req, res) {
  _favourite2.default.find().exec(function (err, resdata) {
    if (err) {
      return handleError(err, res);
    }
    if (resdata.length == 0) {
      res.status(200).send({
        message: 'No data found.'
      });
    } else {
      res.json(resdata);
    }
  });
}

// Gets a single Favourite from the DB
function show(req, res) {
  return _favourite2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Gets a user's liked menuItem from the DB
function userFav(req, res) {
  var userId = req.user._id;
  _favourite2.default.find({ "user": userId, userReaction: { $in: ["LIKE"] } }).populate('menuItem', 'title thumb description price discount').exec(function (err, favourite) {
    if (err) {
      return handleError(res, err);
    }
    if (!favourite) {
      return res.status(404).send('Not Found');
    }
    return res.json(favourite);
  });
}

// Creates a new Favourite in the DB
function create(req, res) {
  console.log('req.body' + (0, _stringify2.default)(req.body));
  var favourite = new _favourite2.default(req.body);
  favourite.user = req.user.id;
  favourite.save(function (err) {
    if (err) {
      return handleError(err, res);
    }
    res.json(favourite);
  });
}

// Upserts the given Favourite in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _favourite2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Favourite from the DB
function destroy(req, res) {
  _favourite2.default.findOne({ $and: [{ user: req.user.id }, { menuItem: req.body.menuItem }] }, {}).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}

//check favourite
function checkFavourite(req, res) {
  var resflag = false;
  return _favourite2.default.find({ $and: [{ user: req.user.id }, { menuItem: req.body.menuItem }] }, {}).exec(function (err, data) {
    if (err) {
      return handleError(res, err);
    }
    if (data.length == 0) {
      var resdata = {
        resflag: resflag
      };
      res.json(resdata);
    }
    if (data.length == 1) {
      resflag = true;
      var _resdata = {
        resflag: resflag
      };
      res.json(_resdata);
    }
  });
}
//# sourceMappingURL=favourite.controller.js.map
