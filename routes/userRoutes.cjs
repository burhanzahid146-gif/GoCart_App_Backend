const express = require('express')
const {getMe , getAllUsers, getUser, register, login , updateUser, deleteUser , updateRole}  = require('../controllers/index.cjs')
const userRoutes = express.Router()
const { authentication }= require("../middleware/authenticationMiddleware.cjs")
const upload = require('../middleware/uploadMiddleware.cjs');
const  authorization  = require('../middleware/authorizationMiddleware.cjs');


  userRoutes.get('/', authentication, authorization(['admin']), getAllUsers)
  userRoutes.get('/me', authentication, getMe )
  userRoutes.patch('/role/:id', authentication, authorization(['admin']), updateRole);
  userRoutes.get( '/:id' , authentication ,  getUser )
  userRoutes.post( '/register' , register)
  userRoutes.post('/login', login)
  userRoutes.patch('/:id', authentication, upload.single('avatar'), updateUser); 
  userRoutes.delete('/:id', authentication, authorization(['admin']), deleteUser)


module.exports = userRoutes
