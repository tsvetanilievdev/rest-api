const { Schema, model, Types: { ObjectId } } = require('mongoose');

const itemSchema = new Schema({
    make: {
        type: String,
        minlength: [3, 'Make must be at least 3 characters long!']
    },
    model: {
        type: String,
        minlength: [3, 'Model must be at least 3 characters long!']
    },
    year: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => value >= 1950 && value <= 2050,
            message: 'Year must be between 1950 and 2050 year'
        }
    },
    description: {
        type: String,
        minlength: [10, 'Make must be at least 10 characters long!']
    },
    price: {
        type: Number,
        required: true,
        min: [0.01, 'Price must be positive number!']
    },
    material: {
        type: String,
        default: ''
    },
    img: {
        type: String,
        required: [true, 'Image url is required!']
    },
    _ownerId: {
        type: ObjectId,
        required: true,
        ref: 'user'
    }
})

itemSchema.index({ model: 1, make: 1, description: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

const Item = model('item', itemSchema);

module.exports = Item;