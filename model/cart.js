const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    products: {
        type: [{
            product: {type: mongoose.Schema.Types.ObjectId, ref: 'ProductModel'},
            quantity: { type: Number, default: 1}
        }]
    },
    }, { timestamps: true });

module.exports = mongoose.model('CartModel', cartSchema);