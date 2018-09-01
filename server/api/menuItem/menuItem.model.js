'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuItemSchema = new _mongoose2.default.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  category: {
    type: _mongoose.Schema.ObjectId,
    ref: 'Category'
  },
  //This field should have same data as the title field of category
  categoryTitle: {
    type: String
  },
  thumb: {
    type: String
  },
  additionalInfo: {
    type: String
  },
  extraIngredients: {
    type: Array
  },

  //DEVELOPPING
  discount: {
    type: Number
  },
  totalRating: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  noOfRating: {
    type: Number,
    default: 0
  },
  price: {
    type: Array
  },
  //to do sorting
  sortPrice: {
    type: Number
  },
  available: {
    type: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

exports.default = _mongoose2.default.model('MenuItem', MenuItemSchema);
//# sourceMappingURL=menuItem.model.js.map
