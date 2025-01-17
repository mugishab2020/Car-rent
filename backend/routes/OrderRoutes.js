const express = require('express');
const { makeNewOrder, OrdersbyUserId} = require('../controllers/OrderController');
const OrderRoutes = express.Router();

OrderRoutes.post('/makeorder', makeNewOrder);
OrderRoutes.get('/getorderbyUserId/:userId', OrdersbyUserId);

module.exports = OrderRoutes;
