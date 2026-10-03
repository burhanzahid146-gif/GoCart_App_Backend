const { DataTypes } = require('sequelize');
const sequelize = require('../config/db_config.cjs');
const USER = require('./userModel.cjs');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true, 
  },
  orderId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  productTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  productImage: {          
    type: DataTypes.TEXT,  
    allowNull: true       
  },
  
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  paymentMethod: {
    type: DataTypes.ENUM('cod', 'card'),
    defaultValue: 'cod',
    allowNull: false
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  status: {
    type: DataTypes.ENUM('Pending', 'Processing', 'Completed', 'Cancelled'),
    defaultValue: 'Pending',
    allowNull: false
  }
});

USER.hasMany(Order, { foreignKey: 'userId', onDelete: 'CASCADE' });
Order.belongsTo(USER, { foreignKey: 'userId' });


module.exports = Order;