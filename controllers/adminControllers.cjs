const USER = require("../Models/userModel.cjs");


const gotAllUsers = async (req, res) => {
    try {
        const users = await USER.findAll({ 
            attributes: { exclude: ['password'] } 
        });
        
        return res.status(200).json({
            success: true,
            message: 'Fetched all users successfully',
            data: users
        });
    } catch (error) {
        console.log(error, "Error fetching users");
        return res.status(500).json({ 
            success: false,
            message: 'Internal Server Error' 
        });
    }
};


const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await USER.findByPk(userId, { 
            attributes: { exclude: ['password'] } 
        });
        
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found' 
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User fetched successfully',
            data: user
        });
    } catch (error) {
        console.log(error, "Error fetching user");
        return res.status(500).json({ 
            success: false,
            message: 'Internal Server Error' 
        });
    }
};


const DeleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await USER.findByPk(userId);
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found' 
            });
        }

     
        await user.destroy();

        return res.status(200).json({
            success: true,
            message: 'User deleted successfully from database',
            data: { id: userId }
        });
    } catch (error) {
        console.log(error, "Error deleting user");
        return res.status(500).json({ 
            success: false,
            message: 'Internal Server Error' 
        });
    }
};

module.exports = { gotAllUsers, getUserById, DeleteUser, };