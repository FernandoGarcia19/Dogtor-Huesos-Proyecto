//dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PetSchema = new Schema({
    idClient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    
    namePet: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    record: [{
        type: Schema.Types.ObjectId,
        ref: 'Record'
    }]
});

const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;