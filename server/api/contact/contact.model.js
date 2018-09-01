'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _contact = require('./contact.events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContactSchema = new _mongoose2.default.Schema({
	name: {
		type: String
	},
	email: {
		type: String
	},
	message: {
		type: String
	},
	subject: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

(0, _contact.registerEvents)(ContactSchema);
exports.default = _mongoose2.default.model('Contact', ContactSchema);
//# sourceMappingURL=contact.model.js.map
