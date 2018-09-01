/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/notifications              ->  index
 * POST    /api/notifications              ->  create
 * GET     /api/notifications/:id          ->  show
 * PUT     /api/notifications/:id          ->  upsert
 * PATCH   /api/notifications/:id          ->  patch
 * DELETE  /api/notifications/:id          ->  destroy
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
exports.unreadNotification = unreadNotification;
exports.updateNotification = updateNotification;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _notification = require('./notification.model');

var _notification2 = _interopRequireDefault(_notification);

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

// Gets a list of Notifications
function index(req, res) {
  _notification2.default.find().exec(function (err, resdata) {
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

// Gets a single Notification from the DB
function show(req, res) {
  return _notification2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Notification in the DB
function create(req, res) {
  return _notification2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Upserts the given Notification in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _notification2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Updates an existing Notification in the DB
function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _notification2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(patchUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Notification from the DB
function destroy(req, res) {
  return _notification2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}

//
// Gets a list of unread Notifications
function unreadNotification(req, res) {
  return _notification2.default.find({ readNotification: false }, {}).exec(function (err, data) {
    if (err) {
      handleError(res, err);
    }
    if (data.length == 0) {
      _notification2.default.find().sort('-createdAt').limit(5).exec(function (err, lastfivedata) {
        if (err) {
          handleError(res, err);
        } else {
          res.json(lastfivedata);
        }
      });
    } else {
      res.json(data);
    }
  });
}

//update notification
function updateNotification(req, res) {
  _notification2.default.update({ 'readNotification': false }, { $set: { 'readNotification': true } }, { 'multi': true }).exec(function (err, notification) {
    if (err) {
      return handleError(res, err);
    }
    if (!notification) {
      return res.status(404).send('Not Found');
    }
    res.status(200).send({
      message: 'All notification read.'
    });
  });
}
//# sourceMappingURL=notification.controller.js.map
