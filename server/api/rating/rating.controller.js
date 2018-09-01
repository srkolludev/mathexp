/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/ratings              ->  index
 * POST    /api/ratings              ->  create
 * GET     /api/ratings/:id          ->  show
 * PUT     /api/ratings/:id          ->  upsert
 * PATCH   /api/ratings/:id          ->  patch
 * DELETE  /api/ratings/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deleteProperty = require('babel-runtime/core-js/reflect/delete-property');

var _deleteProperty2 = _interopRequireDefault(_deleteProperty);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.index = index;
exports.show = show;
exports.create = create;
exports.upsert = upsert;
exports.patch = patch;
exports.destroy = destroy;
exports.menuitemRating = menuitemRating;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _rating = require('./rating.model');

var _rating2 = _interopRequireDefault(_rating);

var _menuItem = require('../menuItem/menuItem.model');

var _menuItem2 = _interopRequireDefault(_menuItem);

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
      // eslint-disable-next-line prefer-reflect
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

// Gets a list of Ratings
function index(req, res) {
  _rating2.default.find().exec(function (err, resdata) {
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

// Gets a single Rating from the DB
function show(req, res) {
  return _rating2.default.find({ $and: [{ user: req.user._id }, { order: req.params.orderId }] }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// //create rating
// export function create(req, res) {
//   var userID                = req.user._id;
//   var rating         = new Rating(req.body);
//   rating.user        = userID;
//   rating.save(function (err) {
//     if (err) {
//       console.log(err)
//       return res.status(400).send({
//         message: 'Something Wrong'
//       });
//     } else {
//          // res.json({message:"done"}); 
//          MenuItem.findById(req.body.menuItem).exec(function (err, menuItem) {
//               if (err) {
//                 return handleError(res, err);
//               }
//               if (!menuItem) {
//                 return res.status(404).send('Not Found');
//               }
//               if(menuItem.totalRating == undefined){
//                 var totalRating= req.body.rating;
//                var noOfRating=1;
//                var rating=(totalRating/noOfRating);
//               }else{
//                 var totalRating= menuItem.totalRating + req.body.rating;
//                var noOfRating=menuItem.noOfRating + 1;
//                var rating= (totalRating/noOfRating).toFixed(1);
//               }
//                var menuItems        = new MenuItem(menuItem);
//                menuItems.totalRating = totalRating;
//                menuItems.noOfRating = noOfRating;
//                menuItems.rating = rating;
//                menuItems.update(
//                 { "_id" : req.body.menuItem,
//                  "totalRating":totalRating,
//                  "noOfRating":noOfRating,
//                  "rating":rating,
//                 }).exec(function (err, afterUpdate) {
//                                if (err) {
//                                 return handleError(res, err);
//                                 }
//                                 if (!menuItem) {
//                                   return res.status(404).send('Not Found');
//                                 }
//                                 res.json({message:"Successfully Rated"})
//                           })
//         });
//     }
//   });
// }


function create(req, res) {
  console.log('11111111111111');
  var userID = req.user._id;
  var rating = new _rating2.default(req.body);
  rating.user = userID;
  rating.save(function (err) {
    if (err) {
      console.log(err);
      return handleError(err, res);
    } else {
      // res.json({message:"done"}); 
      _menuItem2.default.findById(req.body.menuItem).exec(function (err, menuItem) {
        if (err) {
          return handleError(res, err);
        }
        if (!menuItem) {
          return res.status(404).send('Not Found');
        }
        if (menuItem.totalRating == undefined) {
          var totalRating = req.body.rating;
          var noOfRating = 1;
          var rating = totalRating / noOfRating;
        } else {
          var totalRating = menuItem.totalRating + req.body.rating;
          var noOfRating = menuItem.noOfRating + 1;
          var rating = (totalRating / noOfRating).toFixed(1);
        }
        var menuItems = new _menuItem2.default(menuItem);
        menuItems.totalRating = totalRating;
        menuItems.noOfRating = noOfRating;
        menuItems.rating = rating;
        menuItems.update({ "_id": req.body.menuItem,
          "totalRating": totalRating,
          "noOfRating": noOfRating,
          "rating": rating
        }).exec(function (err, afterUpdate) {
          if (err) {
            return handleError(res, err);
          }
          if (!menuItem) {
            return res.status(404).send('Not Found');
          }
          //res.json({message:"Successfully Rated"})
          _order2.default.findById(req.body.order).exec(function (err, data) {
            if (err) {
              return handleError(res, err);
            } else {
              _order2.default.update({ '_id': req.body.order, 'cart.productId': req.body.menuItem }, { '$set': {
                  'cart.$.ratingFlag': 1,
                  'cart.$.rating': req.body.rating
                } }, function (err) {
                if (err) {
                  return handleError(err, res);
                } else {
                  res.json({ message: "Successfully Rated" });
                }
              });
            }
          });
        });
      });
    }
  });
}

// Upserts the given Rating in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    (0, _deleteProperty2.default)(req.body, '_id');
  }
  return _rating2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Updates an existing Rating in the DB
function patch(req, res) {
  if (req.body._id) {
    (0, _deleteProperty2.default)(req.body, '_id');
  }
  return _rating2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(patchUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Rating from the DB
function destroy(req, res) {
  return _rating2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}

// Gets a list of Ratings of a menuitem
function menuitemRating(req, res) {
  return _rating2.default.find({ 'menuItem': req.params.menuitem }, {}).populate('user', 'name imageUrl').exec().then(respondWithResult(res)).catch(handleError(res));
}
//# sourceMappingURL=rating.controller.js.map
