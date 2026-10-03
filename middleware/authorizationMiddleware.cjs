

const authorization = (allowedRole)=>{

    return (req, res, next)=>{
        try {
            let role = req.role

            if (!allowedRole.includes(role)) {
                return res.status(400).json({
                    message: "Unauthorized Role Request"
                })
            }

            next()
        } catch (error) {
            console.log(error, "Error from authorization middleware")
            return res.status(500).json({
                message:"Internal Server Error"
            })
        }
    }
}


module.exports = authorization