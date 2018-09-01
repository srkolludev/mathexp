/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/menuItems              ->  index
 * POST    /api/menuItems              ->  create
 * GET     /api/menuItems/:id          ->  show
 * PUT     /api/menuItems/:id          ->  upsert
 * PATCH   /api/menuItems/:id          ->  patch
 * DELETE  /api/menuItems/:id          ->  destroy
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
exports.noOfMenuItem = noOfMenuItem;
exports.offerAvailable = offerAvailable;
exports.offerCount = offerCount;
exports.destroy = destroy;
exports.getByCategory = getByCategory;
exports.customMenuitems = customMenuitems;
exports.topTwelveMenuitemsBasedOnRating = topTwelveMenuitemsBasedOnRating;
exports.recentMenuitems = recentMenuitems;
exports.sortedMenuitem = sortedMenuitem;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _menuItem = require('./menuItem.model');

var _menuItem2 = _interopRequireDefault(_menuItem);

var _category = require('../category/category.model');

var _category2 = _interopRequireDefault(_category);

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

// Gets a list of MenuItems
function index(req, res) {
  return _menuItem2.default.find().populate('image', 'PublicID').sort('-createdAt').exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single MenuItem from the DB
function show(req, res) {
  return _menuItem2.default.findById(req.params.id).populate('image', 'PublicID').exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new MenuItem in the DB
function create(req, res) {
  var menuItem = new _menuItem2.default(req.body);
  menuItem.title = req.body.title;
  menuItem.description = req.body.description;
  menuItem.category = req.body.category;
  menuItem.categoryTitle = req.body.categoryTitle;
  menuItem.thumb = req.body.thumb;
  menuItem.extraIngredients = req.body.extraIngredients;
  if (req.body.discount <= 0 || req.body.discount === null || !req.body.discount) {
    menuItem.discount = 0;
  }
  if (req.body.discount > 0) {
    menuItem.discount = req.body.discount;
  }
  menuItem.price = req.body.price;
  menuItem.available = req.body.available;
  menuItem.save(function (err) {
    if (err) {
      return handleError(res);
    } else {
      res.json(menuItem);
    }
  });
}

// Upserts the given MenuItem in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _menuItem2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().then(respondWithResult(res)).catch(handleError(res));
}

//getting all categories's menuItem count
function noOfMenuItem(req, res) {
  var i;
  var rawData = [];
  var categoryName = [];
  var length;
  var rawDataInObj = {};
  var rawDataInObjInArray = [];
  var result = {};
  _menuItem2.default.aggregate([{ $group: {
      _id: '$categoryTitle',
      data: { $sum: 1 }
    } }]).exec(function (err, menuItem) {
    if (err) {
      return handleError(res, err);
    }
    length = menuItem.length;
    for (i = 0; i < length; i++) {
      categoryName.push(menuItem[i]._id);
      rawData.push(menuItem[i].data);
    }
    rawDataInObj = {
      data: rawData
    };
    rawDataInObjInArray.push(rawDataInObj);
    result = {
      labels: categoryName,
      datasets: rawDataInObjInArray
    };
    res.json(result);
  });
}

//products on which offer available
function offerAvailable(req, res) {
  _menuItem2.default.find({ discount: { $gt: 0 } }).exec(function (err, menuItems) {
    if (err) {
      return handleError(res, err);
    }
    if (!menuItems) {
      return res.status(404).send('Not Found');
    }

    return res.json(menuItems);
  });
}

//Count of products on which offer available
function offerCount(req, res) {
  var count = {};
  _menuItem2.default.count({ discount: { $gt: 0 } }).exec(function (err, menuItems) {
    if (err) {
      return handleError(res, err);
    }
    if (!menuItems) {
      return res.status(404).send('Not Found');
    }
    count = {
      count: menuItems
    };
    return res.json(count);
  });
}

// Deletes a MenuItem from the DB
function destroy(req, res) {
  return _menuItem2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}

//get a list of menuitems by category id
function getByCategory(req, res) {
  _menuItem2.default.find({ 'category': req.params.id }).populate('category', 'title').sort('asc').exec(function (err, product) {
    if (err) {
      console.log('err MenuItem: ' + err);
      return handleError(res, err);
    }
    if (!product) {
      return res.status(404).send('Not Found');
    }
    return res.json(product);
  });
}

//Custom search by category name
function customMenuitems(req, res) {
  //menuitem instead of menuitem name required
  _menuItem2.default.find({ title: { $regex: req.body.menuitem, $options: 'i' } }).exec(function (err, data) {
    if (err) {
      res.status(400).send({
        message: 'Something Went Wrong.'
      });
    } else {
      res.json(data);
    }
  });
}

function topTwelveMenuitemsBasedOnRating(req, res) {
  _menuItem2.default.find().sort('-rating').limit(12).exec(function (err, result) {
    if (err) {
      return hendleError(err, res);
    }
    if (result.length == 0) {
      res.status({
        message: 'There is no such menuitem available matching this criteria.'
      });
    } else {
      res.json(result);
    }
  });
}

//Recent twelve menuitems 
function recentMenuitems(req, res) {
  _menuItem2.default.find().sort('createdAt').limit(12).exec(function (err, result) {
    if (err) {
      return hendleError(err, res);
    }
    if (result.length == 0) {
      res.status({
        message: 'There is no such menuitem available matching this criteria.'
      });
    } else {
      res.json(result);
    }
  });
}

//get all menuitems,sorted by sortkey
function sortedMenuitem(req, res) {
  var sortkey = void 0;
  if (req.body.priceHighToLow == 1) {
    sortkey = '-sortPrice';
  }
  if (req.body.priceLowToHigh == 1) {
    sortkey = 'sortPrice';
  }
  if (req.body.newlyArrived == 1) {
    sortkey = '-createdAt';
  }
  _menuItem2.default.find().sort(sortkey).exec(function (err, menudata) {
    if (err) {
      return handleError(err, res);
    } else {
      res.json(menudata);
    }
  });
}
//# sourceMappingURL=menuItem.controller.js.map
