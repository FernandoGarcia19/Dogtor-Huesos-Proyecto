const express = require('express');

const clinicalHistoryRouter = express.Router();

const clinicalHistoryController = require('../Controllers/clinicalhistory.controller');
const clinicalHistory = require('../Models/clinicalHistory.model');

clinicalHistoryRouter.get('/', clinicalHistoryController.getAllHistory);

clinicalHistoryRouter.post('/', clinicalHistoryController.createNewHistory);

clinicalHistoryRouter.get('/:id', clinicalHistoryController.getHistoryById);

clinicalHistoryRouter.patch('/:id', clinicalHistoryController.updateHistory);

clinicalHistoryRouter.delete('/:id', clinicalHistoryController.deleteHistory);

clinicalHistoryRouter.get('/:PetId', clinicalHistoryController.getHistoryByPetId);

module.exports = clinicalHistoryRouter;

