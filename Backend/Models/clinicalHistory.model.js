// dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const clinicalHistorySchema = new Schema({
    namePet: {
        type: String,
        ref: 'Pet',
        required: true
    },
    date: {
        type: Date,
        requiered: true
    },
    condition: {
        type: String,
        required: true
    },
    treatment: {
        type: String,
        required: true
    },
    notes: {
        type: String
    }
});

const clinicalHistory = mongoose.model('clinicalHistory', clinicalHistorySchema);
module.exports = clinicalHistory;