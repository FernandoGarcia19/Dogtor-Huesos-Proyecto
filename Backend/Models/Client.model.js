//dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');

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
    password:{
        type: String, 
        required: true
    },
    pets: [{
        type: Schema.Types.ObjectId,
        ref: 'Pet'
    }]
});

ClientSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10); 
        this.password = await bcrypt.hash(this.password, salt); 
        next();
    } catch (error) {
        next(error);
    }
});

const Client = mongoose.model('client', ClientSchema);

module.exports = Client;