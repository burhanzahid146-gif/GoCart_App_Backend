const jwt = require("jsonwebtoken")
const USER = require("../Models/userModel.cjs")


const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization || req.headers.Authorization

        if (!token) {
            return res.status(400).json({
                message: "Please Provide Token To Proceed."
            })
        }

        let splitToken = token.split(" ")[1] 
        let verifyToken;

        try {
            verifyToken = jwt.verify(splitToken, process.env.JSON_SECRET_KEY);
        } catch (error) {
            console.log(error, "JWT Verification Error")
            return res.status(401).json({
                message: "Token Verification Failed."
            })
        }

        let user = await USER.findOne({
            where: {
                id: verifyToken.id
            }
        })

        if (!user) {
            return res.status(404).json({
                message: "User not found for this token."
            })
        }

        req.user = user
        req.id = verifyToken.id
        req.role = user.role; 

        next()
    } catch (error) {
        console.log(error, "Error from authentication Middleware")
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const isAdmin = (req, res, next) => {
    if (req.role !== 'admin') {
        return res.status(403).json({
            message: "Access Denied. Only admins can perform this action."
        });
    }
    next();
}

module.exports =  { authentication, isAdmin }