const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String
    },
    img: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('ProductModel', productSchema);