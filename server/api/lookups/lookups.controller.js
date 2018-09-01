/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/categories              ->  index
 * POST    /api/categories              ->  create
 * GET     /api/categories/:id          ->  show
 * PUT     /api/categories/:id          ->  upsert
 * PATCH   /api/categories/:id          ->  patch
 * DELETE  /api/categories/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.index = index;
exports.create = create;

var _lookups = require('./lookups.model');

var _lookups2 = _interopRequireDefault(_lookups);

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

// Gets a list of Categorys
function index(req, res) {
	if (req.query.rev != undefined) {
		console.log('..get lookups rev#...' + req.query.rev);
		var query = _lookups2.default.find({ rev: req.query.rev }).select('lkups');
		query.exec(function (err, lkups) {
			if (err) return next(err);
			res.json(lkups[0]);
		});
	} else {
		_lookups2.default.find({}, function (err, lookups) {
			console.log('..questions.find start...');
			if (err) {
				res.send(500, { error: err });
			}
			res.json(lookups);
			console.log('..questions.find end...');
		});
	}
}

function create(req, res) {
	console.log('qn upsert...' + req.body._id);
	//  if(req.body._id) {
	//   delete req.body._id;
	// }
	return _lookups2.default.findOneAndUpdate({ rev: 0 }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().then(respondWithResult(res)).catch(handleError(res));
}

/*
// Creates a new Category in the DB
export function create(req, res) {	try {
			console.log('lookups post...' + JSON.stringify(req.body));
			Lookups.findOne({ rev: 0 }, (err, lookups) => {
				if (err) {
					console.log('lookups post error...' + req.body._id);
					res.send(err);
				}
				lookups.lkups = undefined;
				lookups.lkups = req.body.lkups;
				lookups.save(function (err) {
					if (err) {
						console.log('lookups post error 2...' + req.body._id);
						res.send(err);
					}
					console.log('lookups post success...');
					//res.json(result);
					res.json({ message: 'Lookups updated!' });
				}); //end of save
			}); //end of fine one

		}
		catch (e) {
			console.log('lookups post exception...' + JSON.stringify(e));
		}
		*/
//# sourceMappingURL=lookups.controller.js.map
