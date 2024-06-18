const mongoose = require('mongoose')
const createError = require('http-errors');

const clinicalHistory = require("../Models/clinicalHistory.model");

module.exports = {
    getAllHistory : async(req, res, next) => {
        try{
            const results = await clinicalHistory.find({},{__v: 0});
            res.send(results);
        } catch(error) {
            console.log(error.message);
        }
    },
    createNewHistory: async (req,res,next)=>{    
        try {
            const history = new clinicalHistory(req.body);
            const result = await history.save();
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
    getHistoryById: async (req,res,next)=>{
        const id = req.params.id;
        try {
            const hisotry = await clinicalHistory.findById(id);
            if(!hisotry){
                throw createError(404, "History does not exist.");
            }
            res.send(hisotry);
        } catch(error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Clinical Hisotry Id"));
                return;
            }
            next(error);
        }
    },
    updateHistory: async (req,res,next)=>{
        try {
            const id = req.params.id;
            const update = req.body;
            const result = await clinicalHistory.findByIdAndUpdate(id, update, {new: true});
            if(!result) {
                throw createError(404, "History does not exist.");
            }
            res.send(result);
        } catch(error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError) {
                return next(createError(400, "Invalid Clinical Hisotry Id"));
            }
            next(error);
        }
    },
    deleteHistory: async (req, res, next) => {
        const id = req.params.id;
        try {
            const result = await clinicalHistory.findByIdAndDelete(id);
            if (!result) {
                throw createError(404, "History does not exist.");
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid History Id"));
                return;
            }
            next(error);
        }
    },
    getHistoryByPetId: async (req, res, next) => {
        const PetId = req.params.PetId
        try {
            const hisotry = await clinicalHistory.find({petId:PetId});
            if(!hisotry){
                throw createError(404, "History does not exist.");
            }
            res.send(hisotry);
        } catch(error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Clinical Hisotry Id"));
                return;
            }
            next(error);
        }
    }
}