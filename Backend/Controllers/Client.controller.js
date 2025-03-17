const mongoose = require('mongoose');
const createError = require('http-errors');
const bcrypt = require('bcrypt');

const Client = require('../Models/Client.model');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await Client.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: "Credenciales inválidas" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Credenciales inválidas" });
            }

            res.status(200).json({ message: "Login exitoso", user });
        } catch (error) {
            console.error(error);
            next(createError(500, "Error en el servidor"));
        }
    },
    createNewClient: async (req, res, next) => {
        try {
            const client = new Client(req.body);
            const result = await client.save();
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error.name === 'ValidationError') {
                next(createError(422, error.message));
                return;
            }
            next(error);
        }
    },
    getAllClients : async (req,res,next)=>{
        try {
                const results = await Client.find({}, {__v: 0});
                res.send(results);
        } catch (error) {
            console.log(error.message);
        }
    },
    getClientById: async (req,res,next)=>{
        const id = req.params.id;
        try {
            const client = await Client.findById(id);
            if(!client){
                throw createError(404, "Client does not exist.");
            }
            res.send(client);
        } catch(error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Client Id"));
                return;
            }
            next(error);
        }
    },
    getClientByCi: async (req, res, next)=>{
        const ci = req.params.ci;
        try {
            const client = await Client.findOne({ ci:ci });
            if(!client){
                throw createError(404, "Client not found");
            }
            res.json(client);
        } catch (error) {
            console.log(error.message);
            if(error instanceof mongoose.Mongoose.CastError){
                next(createError(400, "Invalid Client C.i"));
                return;
            }
            next(error);
        }
    },
    updateClient: async (req,res,next)=>{
        try {
            const ci = req.params.ci;
            const updatedData = req.body;
            const cliente = await Client.findOneAndUpdate({ ci: ci }, updatedData, { new: true });
            if (cliente) {
                res.json(cliente);
            } else {
                res.status(404).json({ message: 'Cliente no encontrado' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Error del servidor' });
        }
    },
    deleteClient: async (req,res,next)=>{
        const id = req.params.id;
        try {
            const result = await Client.findByIdAndDelete(id);
            if(!result){
                throw createError(404, "Client does not exist.");
            }
            res.send(result);
        } catch(error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Client Id"));
                return;
            }
            next(error);
        }
    },
    deleteClientByCi: async (req, res, next)=>{
        try {
            const ci = req.params.ci;
            const deletedClient = await Client.findOneAndDelete({ ci: ci });
            if (deletedClient) {
                res.status(200).json({ message: 'Cliente eliminado correctamente' });
            } else {
                res.status(404).json({ message: 'Cliente no encontrado' });
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: 'Error del servidor' });
        }
    }
};
