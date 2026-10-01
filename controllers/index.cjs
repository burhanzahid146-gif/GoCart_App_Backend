
const {getMe , getAllUsers, getUser, register, login , updateUser, deleteUser , updateRole}  = require('./userControllers.cjs')

const {gotAllUsers , getUserById , DeleteUser} = require('./adminControllers.cjs')

const { getOrders , createOrder , deleteOrder , getOrderById } = require('./orderControllers.cjs')

module.exports = {

    // User Controllers 
    getAllUsers, getUser, register, login , updateUser, deleteUser, getMe, updateRole,

    // Admin Controllers
    gotAllUsers , getUserById , DeleteUser,

    // Order Controller
    getOrders , createOrder , deleteOrder , getOrderById,
}