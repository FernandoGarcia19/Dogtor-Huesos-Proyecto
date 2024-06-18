const mongoose = require('mongoose')
const createError = require('http-errors')

const Appointment = require('../Models/Appointment.model')

module.exports = {
    getAllAppointments : async (req,res,next)=>{
        try {
                const results = await Appointment.find({}, {__v: 0});
                res.send(results);
        } catch (error) {
            console.log(error.message);
        }
    },
    createNewAppointment: async (req,res,next)=>{
        try {
            const appointment = new Appointment(req.body);
            const result = await appointment.save();
            res.send(result);
        } catch(error) {
            console.log(error.message);
            if(error.name === 'ValidationError') {
                next(createError(422, error.message));
                return;
            }
            next(error);
        }
    },
    getAppointmentById: async (req,res,next)=>{
        const id = req.params.id;
        try {
            const appointment = await Appointment.findById(id);
            if(!appointment){
                throw createError(404, "Appointment does not exist.");
            }
            res.send(appointment);
        } catch(error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Appointment Id"));
                return;
            }
            next(error);
        }
    },
    updateAppointment: async (req,res,next)=>{
        try {
            const id = req.params.id;
            const update = req.body;
            const result = await Appointment.findByIdAndUpdate(id, update, {new: true});
            if(!result) {
                throw createError(404, "Appointment does not exist");
            }
            res.send(result);
        } catch(error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError) {
                return next(createError(400, "Invalid Appointment Id"));
            }
            next(error);
        }
    },
    deleteAppointment: async (req,res,next)=>{
        const id = req.params.id;
        try {
            const result = await Appointment.findByIdAndDelete(id);
            if(!result){
                throw createError(404, "Appointment does not exist.");
            }
            res.send(result);
        } catch(error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Appointment Id"));
                return;
            }
            next(error);
        }
    },
    getAppointmentByPetId: async (req, res, next) => {
        const PetId = req.params.PetId
        try {
            const appt = await Appointment.find({petId:PetId});
            if(!appt){
                throw createError(404, "Appointment does not exist.");
            }
            res.send(appt);
        } catch(error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Appointment"));
                return;
            }
            next(error);
        }
    }
};
