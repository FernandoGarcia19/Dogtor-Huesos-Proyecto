const express = require('express');

const PetRouter = express.Router();

const PetController = require('../Controllers/Pet.controller');
const Pet = require('../Models/Pet.model');

//CRUD operation handling through client controller
PetRouter.get('/', PetController.getAllPets);

PetRouter.post('/', PetController.createNewPet);

PetRouter.get('/:namePet', PetController.getPetByName);

PetRouter.patch('/:namePet', PetController.updatePet);

PetRouter.delete('/:namePet', PetController.deletePet);

PetRouter.get('/owner/:ci', PetController.getPetByCIClient);

PetRouter.get('/with-clients', PetController.getAllPetsWithClients);

module.exports = PetRouter;