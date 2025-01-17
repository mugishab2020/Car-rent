const express = require('express');
const { registerCar, removeCar, ListCars, CarbyId } = require('../controllers/carController');
const carRoutes = express.Router();

carRoutes.post('/car-register', registerCar);
carRoutes.delete('/delete-car', removeCar);
carRoutes.get('/carList', ListCars);
carRoutes.get('/carbyId/:carId', CarbyId);

module.exports = carRoutes;
