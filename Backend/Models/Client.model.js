//dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClientSchema = new Schema({
    ci: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pets: [{
        type: Schema.Types.ObjectId,
        ref: 'Pet'
    }]
});

const Client = mongoose.model('client', ClientSchema);

module.exports = Client;