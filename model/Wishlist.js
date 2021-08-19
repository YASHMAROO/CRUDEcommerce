const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishlistSchema = new Schema ({
    buyerId: {
        type: String,
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            price: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            imageUrl: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('wishlist', wishlistSchema);