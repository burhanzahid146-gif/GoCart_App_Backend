const express = require('express')
const { gotAllUsers, getUserById, DeleteUser }= require('../controllers/index.cjs')
const { authentication, isAdmin } = require('../middleware/authenticationMiddleware.cjs')
const adminRoutes = express.Router()


  adminRoutes.get('/' , authentication, isAdmin, gotAllUsers )
  adminRoutes.get('/:id', authentication, isAdmin, getUserById )
  adminRoutes.delete('/:id',authentication, isAdmin, DeleteUser )

module.exports = adminRoutes