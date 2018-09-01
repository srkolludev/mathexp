/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/booktables              ->  index
 * POST    /api/booktables              ->  create
 * GET     /api/booktables/:id          ->  show
 * PUT     /api/booktables/:id          ->  upsert
 * PATCH   /api/booktables/:id          ->  patch
 * DELETE  /api/booktables/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.index = index;
exports.singleUserBookings = singleUserBookings;
exports.show = show;
exports.create = create;
exports.upsert = upsert;
exports.patch = patch;
exports.destroy = destroy;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _booktable = require('./booktable.model');

var _booktable2 = _interopRequireDefault(_booktable);

var _order = require('../order/order.model');

var _order2 = _interopRequireDefault(_order);

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

// Gets a list of Booktables
function index(req, res) {
  _booktable2.default.find().exec(function (err, resdata) {
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

// Gets a list of Booktables
function singleUserBookings(req, res) {
  return _booktable2.default.find({ 'user': req.user._id }, {}).populate('user', '-salt -password').exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Booktable from the DB
function show(req, res) {
  return _booktable2.default.findById(req.params.id).populate('user', '-salt -password').exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Booktable in the DB
function create(req, res) {
  var booktable = new _booktable2.default(req.body);
  booktable.user = req.user._id;
  var datedata = new Date();
  datedata = Date.now();
  booktable.userNotification.push({ 'status': 'Thank you for your booking.',
    'time': datedata });
  booktable.save(function (err) {
    if (err) {
      return handleError(err, res);
    } else {
      res.status(200).send({
        message: 'Your request has been raised.'
      });
    }
  });
}

// Upserts the given Booktable in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  _booktable2.default.findById(req.params.id).exec(function (err, booktable) {
    var datedata = new Date();
    datedata = Date.now();
    //while owner acceped request
    if (req.body.status == 'Accepted') {
      booktable.userNotification.push({ 'status': 'Booking Accepted.', 'time': datedata });
    }
    //while owner rejected request
    if (req.body.status == 'Rejected') {
      booktable.userNotification.push({ 'status': 'Your booking is cancelled,sorry for inconvenience.', 'time': datedata });
    }
    booktable.save(function (err) {
      if (err) {
        return handleError(res);
      } else {
        _booktable2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: false }).exec().then(respondWithResult(res)).catch(handleError(res));
      }
    });
  });
}

// Updates an existing Booktable in the DB
function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _booktable2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(patchUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Booktable from the DB
function destroy(req, res) {
  return _booktable2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=booktable.controller.js.map
