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
    discount: {
        type: Number
    },
    desc: {
        type: String
    },
    img: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryModel',
    },
    reviews: {
        type: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'UserModel'},
            rating:  {type: Number, min: 1, max: 5 },
            body: {type: String},

        }]
    },
    Rating : { 
        type: Number
    }

});
productSchema.virtual('averageRating').get(function () {
    if (this.reviews.length === 0) {
      return 0;
    }
    const totalRating = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / this.reviews.length;
  });
  

module.exports = mongoose.model('ProductModel', productSchema);