const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const cartSchema = new Schema({
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
            quantity: {
                type: Number,
                default: 0
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
    ],
    totalAmt: {
        type: Number,
        default: 0,
        required: true,
    },
    totalQty: {
        type: Number, 
        default: 0,
        required: true
    }
})

module.exports = mongoose.model('cart', cartSchema);