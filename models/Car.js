// models/Car.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        min: 1886 // Năm phát minh ô tô đầu tiên
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('Car', carSchema);
