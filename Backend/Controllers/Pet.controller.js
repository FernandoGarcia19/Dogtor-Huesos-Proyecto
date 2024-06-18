const mongoose = require('mongoose')
const createError = require('http-errors')

const Pet = require('../Models/Pet.model')
const Client = require('../Models/Client.model');
module.exports = {
    getAllPets : async (req,res,next)=>{
        try {
                const results = await Pet.find({}, {__v: 0});
                res.send(results);
        } catch (error) {
            console.log(error.message);
        }
    },
    createNewPet: async (req,res,next)=>{
        try {
            const pet = new Pet(req.body);
            const result = await pet.save();
            
            // Find the client and update their pets array
            const client = await Client.findOne({ _id: req.body.idClient });
    
            if (!client) {
                // If client not found, delete the created pet to maintain consistency
                await Pet.findByIdAndDelete(result._id);
                return res.status(404).json({ message: 'Client not found' });
            }
    
            client.pets.push(result._id);
            await client.save();
    
            res.status(201).json(result);
        } catch (error) {
            console.log(error.message);
            if (error.name === 'ValidationError') {
                next(createError(422, error.message));
                return;
            }
            next(error);
        }
    },
    getPetByName: async (req,res,next)=>{
        const namePet = req.params.namePet;
        try {
            const pet = await Pet.findOne({namePet:namePet});
            if(!pet){
                throw createError(404, "Pet not found");
            }
            res.send(pet);
        } catch(error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Pet name"));
                return;
            }
            next(error);
        }
    },
    getPetByIdClient: async (req,res,next)=>{
        const idClient = req.params.idClient;
        try {
            const pets = await Pet.find({idClient:idClient});
            if(!pets || pets.length == 0){
                throw createError(404, "Pet not found");
            }
            res.send(pets);
        } catch(error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError) {
                next(createError(400, "Invalid IdClient"));
                return;
            }
            next(error);
        }
    },
    updatePet: async (req,res,next)=>{
        try {
            const NamePet = req.params.namePet;
            const updateData = req.body;
            const result = await Pet.findOneAndUpdate({ namePet: NamePet }, updateData, {new: true});
            if(!result) {
                throw createError(404, "Pet does not exist");
            }
            res.send(result);
        } catch(error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError) {
                return next(createError(400, "Invalid Pet Name"));
            }
            next(error);
        }
    },
    deletePet: async (req,res,next)=>{
        const namePet = req.params.namePet;
        try {
            const result = await Pet.findOneAndDelete({ namePet: namePet });
            if(!result){
                throw createError(404, "Pet does not exist.");
            }
            res.send(result);
        } catch(error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Pet Name"));
                return;
            }
            next(error);
        }
    },
    getPetByCIClient: async (req,res,next)=>{
        try {
            const ownerCI = req.params.ci;
            const client = await Client.findOne({ ci: ownerCI });
    
            if (!client) {
                return res.status(404).json({ message: 'Owner not found' });
            }
            const pets = await Pet.find({ idClient: client._id });
    
            if (pets.length === 0) {
                return res.status(404).json({ message: 'No pets found for this owner' });
            }
            res.status(200).json(pets);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAllPetsWithClients: async (req, res, next) => {
        try {
            const pets = await Pet.find().populate('idClient', 'name');
            res.send(pets);
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ message: error.message });
        }
    }
};
