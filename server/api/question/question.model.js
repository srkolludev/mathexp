'use strict';
/*eslint no-invalid-this:0*/

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QnObj = {
	typ: Number,
	usecase: Number,
	desc: _mongoose.Schema.Types.Mixed,
	ans: _mongoose.Schema.Types.Mixed, //[String],
	eqn: String,
	steps: _mongoose.Schema.Types.Mixed, //[Schema.Types.Mixed],
	drng: _mongoose.Schema.Types.Mixed,
	tpl: String,
	proc: String,
	chty: _mongoose.Schema.Types.Mixed, //[String],
	mtch: _mongoose.Schema.Types.Mixed, //[String],
	grd: _mongoose.Schema.Types.Mixed, //[Number],
	cat: Number,
	sct: Number,
	area: _mongoose.Schema.Types.Mixed, //[Number],
	exam: _mongoose.Schema.Types.Mixed, //[Number],
	lvl: _mongoose.Schema.Types.Mixed, //[Number],
	et: _mongoose.Schema.Types.Mixed,
	//worksheet specific
	cnt: Number,
	aloc: Number,
	rpn: Number,
	dsmi: Number,
	dsma: Number,
	osmil: Number,
	osmal: Number,
	osmir: Number,
	osmar: Number,
	oprn: _mongoose.Schema.Types.Mixed, //[String],
	subq: _mongoose.Schema.Types.Mixed, //[Schema.Types.Mixed],
	//dynamically added
	//ans update dynamically
	evda: _mongoose.Schema.Types.Mixed, //evaluated data of variables and steps
	evhi: _mongoose.Schema.Types.Mixed, //[Schema.Types.Mixed], //evaluated history data of variables and steps
	anhi: _mongoose.Schema.Types.Mixed, //[Schema.Types.Mixed],  //answer history
	mthi: _mongoose.Schema.Types.Mixed, //[Schema.Types.Mixed],  //multiple choice histoty
	cu: String, //created user
	mu: String,
	cd: Date,
	md: Date
};

var QuestionSchema = new _mongoose.Schema(QnObj, { timestamps: true });

exports.default = _mongoose2.default.model('questions', QuestionSchema);
//# sourceMappingURL=question.model.js.map
