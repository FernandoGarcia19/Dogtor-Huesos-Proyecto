//dependencies
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors'); // Import cors middleware
const createError = require('http-errors');
const app = express()
const dotenv = require('dotenv').config()

//parsing

app.use(cors()); // Use cors middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//mongodb connection
mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
}).then(() => {
    console.log('MongoDB HAS CONNECTED....');
});

//route and product connection
const ClientRoute = require('./Routes/Client.route');
const clinicalHistoryRoute = require('./Routes/clinicalHistory.route');
const AppointmentRoute = require('./Routes/Appointment.route');
const PetRoute = require('./Routes/Pet.route')
const { create } = require('./Models/Client.model');
app.use('/clients', ClientRoute);
app.use('/clinical-history', clinicalHistoryRoute);
app.use('/appointments', AppointmentRoute);
app.use('/pets', PetRoute);

//eror handling: 404 not found
app.use((req, res, next) =>{
    next(createError(404, "Not Found"));
});

//Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
});

//listening to localhost on port 3000
app.listen(3000, () =>
    {
        console.log('server started on port 3000')
});