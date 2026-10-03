const express = require('express')
const orderRoutes = express.Router()
const {authentication} = require("../middleware/authenticationMiddleware.cjs")
const { getOrders, createOrder , deleteOrder , getOrderById} = require('../controllers/index.cjs')


orderRoutes.get('/', authentication, getOrders)    
orderRoutes.post('/', authentication, createOrder)
orderRoutes.delete('/:id', authentication , deleteOrder)
orderRoutes.get('/:id', authentication, getOrderById)
module.exports = orderRoutes