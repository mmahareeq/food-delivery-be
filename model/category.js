const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
   name: {
    type: String
   },
}, { timestamps: true });

module.exports = mongoose.model('CategoryModel', categorySchema);