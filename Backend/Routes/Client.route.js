const express = require('express');

const ClientRouter = express.Router();

const ClientController = require('../Controllers/Client.controller');
const Client = require('../Models/Client.model');

//CRUD operation handling through client controller
ClientRouter.get('/', ClientController.getAllClients);

ClientRouter.post('/login', ClientController.login); 

ClientRouter.post('/', ClientController.createNewClient);

ClientRouter.get('/:id', ClientController.getClientById);

ClientRouter.patch('/:ci', ClientController.updateClient);

ClientRouter.delete('/:id', ClientController.deleteClient);

ClientRouter.get('/ci/:ci', ClientController.getClientByCi);

ClientRouter.delete('/ci/:ci', ClientController.deleteClientByCi);

module.exports = ClientRouter;