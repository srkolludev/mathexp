'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _order = require('./order.events');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
var OrderSchema = new mongoose.Schema({

  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },

  cardDetails: {},

  deliveryMethod: {
    type: String
  },
  subTotal: {
    type: Number
  },
  taxAmount: {
    type: Number
  },
  couponDiscountPercentage: {
    type: Number
  },
  loyalityUsed: {
    type: String
  },
  deductedAmountByCoupon: {
    type: Number
  },
  payment: {
    transactionId: {
      type: String
    },
    paymentType: {
      type: String
    },
    paymentStatus: {
      type: Boolean,
      default: false
    }
  },

  //user notification every time
  //when status changes
  userNotification: [{}],
  //address: {},
  loyaltyPoints: [{
    credit: {
      type: Boolean
    },
    points: {
      type: Number
    },
    orderId: {
      type: String
    },
    dateAndTime: {
      type: Date,
      default: Date.now
    }
  }],
  paymentOption: {
    type: String
  },

  billingAddress: {},

  shippingAddress: {},

  grandTotal: {
    type: Number
  },

  //it will hold all product info
  cart: {
    type: Array
  },

  status: {
    type: String,
    default: 'pending'
  },

  orderID: {
    type: Number,
    default: 1000,
    unique: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date
  }

});
OrderSchema.plugin(autoIncrement.plugin, {
  model: 'Order',
  field: 'orderID',
  startAt: 10000,
  incrementBy: 1
});
(0, _order.registerEvents)(OrderSchema);
exports.default = mongoose.model('Order', OrderSchema);
//# sourceMappingURL=order.model.js.map
