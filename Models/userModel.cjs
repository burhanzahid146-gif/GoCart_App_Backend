
const { DataTypes } = require('sequelize')
const sequelize = require('../config/db_config.cjs')


 const USER = sequelize.define('USER' , {
     
     id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull:false,
        defaultValue: DataTypes.UUIDV4,
     },

     email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
       
     },

     password:{
        type: DataTypes.STRING(100),
        allowNull: false
     },
     
      avatar: {
        type: DataTypes.STRING,
        defaultValue: ''
     },

    name: {
        type : DataTypes.STRING,
        allowNull: false,
     },

     role: {
      type: DataTypes.ENUM( "user" , "admin" ),
      defaultValue: "user",
      allowNull: false
     },
    
 })

 module.exports = USER