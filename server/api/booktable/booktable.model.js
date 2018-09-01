'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _booktable = require('./booktable.events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BooktableSchema = new _mongoose2.default.Schema({
	user: {
		type: _mongoose.Schema.ObjectId,
		ref: 'User'
	},
	tableNumber: {
		type: Number
	},
	time: {
		type: String
	},
	date: {
		type: Date
	},

	userNotification: [{}],
	person: {
		type: Number
	},
	status: {
		type: String,
		default: 'Pending'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

(0, _booktable.registerEvents)(BooktableSchema);
exports.default = _mongoose2.default.model('Booktable', BooktableSchema);
//# sourceMappingURL=booktable.model.js.map
