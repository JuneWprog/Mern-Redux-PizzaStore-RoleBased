/**
 * Schema for Order
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    totalPrice: {
        type: Number,
        trim: true,
    },
    subTotal: {
        type: Number,
        trim: true,
    },
    taxPrice: {
        type: Number,
        trim: true,
    },
    shippingPrice: {
        type: Number,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    createdOn: {
        type: Date,
        default: Date.now(),
    },
    dishes: [
        {
            dishName: {
                type: String,
                trim: true,
            },
            quantity: {
                type: Number,
                trim: true,
            },
            price: {
                type: Number,
                trim: true,
            },
            totalItemPrice: {
                type: Number,
                trim: true,
            }
        }
    ],
}, { versionKey: false });

module.exports = mongoose.model('Order', orderSchema);