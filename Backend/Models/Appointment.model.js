const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AppointmentSchema = new Schema({
    ciClient:{
        type: String,
        required: true
    },
    phoneClient:{
        type: String,
        required: true
    },
    emailClient:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    typeService: {
        type: String,
        required: true
    },
    typePet: {
        type: String,
        require:true
    },
    status:{
        type: String,
        required: true
    },
});

const Appointment = mongoose.model('appointment', AppointmentSchema);

module.exports = Appointment;