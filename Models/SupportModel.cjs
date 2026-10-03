const { DataTypes } = require('sequelize');
const sequelize = require('../config/db_config.cjs'); 

const Support = sequelize.define('Support', {
   id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   email: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   message: {
      type: DataTypes.TEXT,
      allowNull: false,
   }
}, {
   tableName: 'supports',
   timestamps: true 
});

module.exports = Support;