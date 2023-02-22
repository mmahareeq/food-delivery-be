const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserModel',
      required: true,
      },
      address: {
        type: String,
        required: true,
        maxlength: 200,
      },
    total: {
        type: Number,
        required: true
    },
    products: {
        type:[ 
             {type: mongoose.Schema.Types.ObjectId, ref: 'ProductModel'},
            // count: {type: Number}
        ],
    },
    status: {
      type: String,
      enum: ['waiting', 'recivied', 'cancelled'],
    }, 
    date: {
      type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('OrderModel', orderSchema);