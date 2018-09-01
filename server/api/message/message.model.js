'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _message = require('./message.events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MessageSchema = new _mongoose2.default.Schema({
	message: {
		type: String
	},
	//seller or user
	sentBy: {
		type: String
	},
	senderRead: {
		type: Boolean
	},
	// //this field is only added to send message by socket
	// //without using conditional statement
	// //else nowhere it would be used.
	// sendTo:{
	// 	type:String
	// },
	receiverRead: {
		type: Boolean
	},
	//user
	sender: {
		type: _mongoose.Schema.ObjectId,
		ref: 'User'
	},
	//seller 
	receiver: {
		type: _mongoose.Schema.ObjectId,
		ref: 'User'
	},
	timestamp: {
		type: Number
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

(0, _message.registerEvents)(MessageSchema);
exports.default = _mongoose2.default.model('Message', MessageSchema);
//# sourceMappingURL=message.model.js.map
