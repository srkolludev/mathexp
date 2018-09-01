'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LkupObj = {
    rev: Number,
    lkups: Schema.Types.Mixed
};

var LookupsSchema = new Schema(LkupObj, { timestamps: true });

exports.default = mongoose.model('lookups', LookupsSchema);
//# sourceMappingURL=lookups.model.js.map
