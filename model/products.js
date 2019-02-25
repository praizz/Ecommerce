
const mongoose = require('mongoose')

const ProductModel = mongoose.model ('ProductModel', {
    product_name: {
        type: String,
        required: true
    },
    product_category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        minLength: 5,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

module.exports = {ProductModel};