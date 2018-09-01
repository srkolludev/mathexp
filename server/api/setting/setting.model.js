'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SchemeConfig = new _mongoose2.default.Schema({
  scheme: {
    "type": String,
    enum: {
      values: ["asmt", "exam", "prct", "trng"]
    }
  },
  grade: {
    "type": String
  },
  exam: {
    "type": String
  },
  choice: [{
    "type": String,
    enum: ["stepSwap", "trueFalse", "textBox", "multipleChoice"]
  }],
  review: {
    type: String,
    // default: "onExam",
    enum: ["onExam", "OnQuestion"]
  },
  timeout: {
    type: String,
    //  default: "onExam",
    enum: ["onExam", "OnQuestion"]
  },
  clock: {
    none: {
      default: false,
      type: Boolean
    },
    downTimerExam: {
      default: false,
      type: Boolean
    },
    downTimerQuestion: {
      default: false,
      type: Boolean
    },
    upTimerExam: {
      default: false,
      type: Boolean
    },
    upTimerQuestion: {
      default: false,
      type: Boolean
    }
  },
  _id: false
});

var SettingSchema = new _mongoose2.default.Schema({
  userid: {
    type: String,
    unique: true

  },
  app: {
    scheme: [{
      type: String,
      //  default: "asmt",
      enum: ["asmt", "exam", "prct", "trng"]
    }],
    grade: [{
      type: String,
      //   default: "1",
      enum: ["1", "2", "3", "4"]
    }],
    exam: [{
      type: String,
      // default: "MEVAL",
      enum: ["SAT", "GATE", "MEVAL", "RRB"]
    }],
    homepage: {
      type: String,
      //   default: "grade",
      enum: ["grade", "exam"]
    },
    level: {
      type: String,
      //   default: "int",
      enum: ["int", "adv"]
    },
    settype: {
      type: String,
      //  default: "system",
      enum: ["system", "user"]
    }
  },
  dev: _mongoose.Schema.Types.Mixed, //theme,language

  schemeOptions: [SchemeConfig],

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

/*
SettingSchema.pre("save",function(next) {
  if (this.scheme.length == 0)
    this.scheme.push("asmt");
  next();
});

5.2.7
userSchema.pre("save",function(next) {
  if (this.permissions.indexOf("Show") == -1)
    this.permissions.push("Show");

  next();
});

http://mongoosejs.com/docs/validation.html

http://mongoosejs.com/docs/middleware.html

*/

exports.default = _mongoose2.default.model('Setting', SettingSchema);
//# sourceMappingURL=setting.model.js.map
