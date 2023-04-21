const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: [true, 'please add a text value']
    },
     lastName: {
        type: String,
        required: [true, 'please add a text value']
    },
     email: {
        type: String,
        unique: true,
        required: [true, 'please add a text value']
    },
     age: {
        type: String,
        required: [true, 'please add a text value']
    }

},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)