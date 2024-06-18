const express = require('express');

const AppointmentRouter = express.Router();

const AppointmentController = require('../Controllers/Appointment.controller');
const Appointment = require('../Models/Appointment.model');

//CRUD operation handling through client controller
AppointmentRouter.get('/', AppointmentController.getAllAppointments);

AppointmentRouter.post('/', AppointmentController.createNewAppointment);

AppointmentRouter.get('/:id', AppointmentController.getAppointmentById);

AppointmentRouter.patch('/:id', AppointmentController.updateAppointment);

AppointmentRouter.delete('/:id', AppointmentController.deleteAppointment);

AppointmentRouter.get('/:PetId', AppointmentController.getAppointmentByPetId);

module.exports = AppointmentRouter;