'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Order Schema
 */
var OrderSchema = new Schema({
  docno: {
    unique: true,
    type: String,
    default: '',
    required: 'Please fill Order docno',
    trim: true
  },
  docdate: {
    type: Date,
    required: 'Please fill Order docdate'
  },
  namedeliver: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  items: {
    required: 'Please fill Order items',
    type: [{
      product: {
        type: Schema.ObjectId,
        ref: 'Product'
      },
      price: Number,
      qty: Number,
      retailerprice: {
        type: Number,
        default: 0
      },
      amount: Number,
      deliverycost: Number,
      discountamount: Number
    }]
  },
  shipping: {
    required: '',
    type: {
      firstname: String,
      lastname: String,
      address: String,
      postcode: String,
      subdistrict: String,
      province: String,
      district: String,
      tel: String,
      email: String,
      sharelocation: {
        latitude: String,
        longitude: String
      }
    }
  },
  accounting: {
    type: String,
    required: 'Please fill Order accounting',
    default: 'cash'
  },
  imgslip: String,
  postcost: Number,
  discount: Number,
  discountpromotion: Number,
  comment: String,
  trackingnumber: String,
  delivery: {
    deliveryid: String,
    deliveryname: String,
    deliverylog: [{
      logdate: Date,
      detail: String
    }]
  },
  remark: String,
  amount: Number,
  weight: String,
  deliveryamount: Number,
  totalamount: Number,
  cartdate: Date,
  deliverystatus: {
    type: String,
    default: 'confirmed'
  },
  refdoc: String,
  drilldate: Date,
  deliverylog: [{
    logdate: Date,
    detail: String
  }],
  historystatus: {
    type: [{
      status: String,
      datestatus: Date,
      remark: String,
      delivername: String
    }]
  },
  src: {
    type: String,
    default: 'ios'
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Order', OrderSchema);
