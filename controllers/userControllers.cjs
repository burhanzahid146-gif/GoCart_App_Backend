const USER = require("../Models/userModel.cjs")
const bcrypt = require("bcrypt")
const validator = require("validator")
const jwt = require('jsonwebtoken')

const getMe = async (req, res)=>{
  try {
    
    

    let myData = await USER.findByPk(req.id);
    
    if (!myData) {
      return res.status(404).json({
        message:"User Not Found"
      })
    }

    return res.status(200).json({
      message:"User Returned",
      data: {
        id: myData.id,
        name: myData.name,
        email: myData.email,
        role: myData.role,
        avatar: myData.avatar
      }
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message:"Internal Server Error"
    })
  }
}

 const getAllUsers = async (req , res)=>{
         
     try {
         const users = await USER.findAll();
         return res.status(200).json({
            message : ' Successfully got All Users',
            data: users
         })

     } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : 'Internal Server Error'
        })
     }
 }

 const getUser = async (req,res)=>{
    
    try {
        const {email} = req.query

        if(!email ){
            return res.status(400).json({
                message: "Provide Email"
            })
        }

        let user = USER.findOne({ where: { email } })
        console.log( user , "Data From BACKEND")
         
        if(!user){
            return res.status(400).json({
                message: "User Not Found"
            })
        }

        const userData = await USER.create({
            email,
            
        })

         return res.status(200).json({
            message : 'successfully Got User',
            data : userData
        })

    } catch (error) {
        console.log(error)
       return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
 }

const register = async (req,res)=>{
       
    try {
       
        const {email , name , password} = req.body
        
        if(!email || !name || !password){
            return res.status(400).json({
                message: "Please Provide Data"
            })
        }
      
      const checkEmail = validator.isEmail(email)
      
      if (!checkEmail) {
        console.log('Email is NOT STRONG')
        return res.status(400).json({
            message: 'Please provide Strong Email'
        })
      }

      const checkPassword = validator.isStrongPassword(password)

      if (!checkPassword) {
         console.log('password is NOT STRONG')
        return res.status(400).json({
            message: 'Please provide Strong Password'
        })
      }

      let checkUser = await USER.findOne({ where: { email } });
      console.log(checkUser , "DATA from BACKEND")

      if(checkUser){
        return res.status(400).json({
            message: "User already exist"
        })
      }
      
      let salt = await bcrypt.genSalt(10)
      let hashedPassword = await bcrypt.hash(password , salt)

      let user =  await USER.create({
       email : email , name: name , password: hashedPassword
    })
        console.log(user , 'New User Created')

        return res.status(201).json({
            message : 'User Created',
            data: user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : 'Internal Server Error'
        })
    }
}

const login = async(req , res)=>{

    try {
        const {email , password} = req.body

        if (!email || !password) {

           return  res.status(400).json({
                message: 'Provide Email and Password'
            })
        }

       let userExists = await USER.findOne({where:{email : email}})

       if (!userExists) {
        return res.status(404).json({
            message: 'User does not Exists'
        })
       }

       let comparePassword = await bcrypt.compare(password , userExists.password)

       if (!comparePassword) {
        return res.status(400).json({
            message: 'Incorrect Password',
            data: userExists
        })
       }
       
       const secretKey = process.env.JSON_SECRET_KEY

       let token = jwt.sign({id: userExists.id} , secretKey , {expiresIn:"5d"})

       return res.status(200).json({
        message: 'USER LOGGED IN',
        data: {
            token,
            userExists
        }
       })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const checkUser = await USER.findByPk(req.params.id);

    if (!checkUser) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    if (role && role !== checkUser.role) {
      if (!req.user || (req.user.role !== "admin" && req.user.role !== "Admin")) {
        return res.status(403).json({
          message: "Unauthorized: Only admins can change user roles",
        });
      }
    }

    let avatarPath = checkUser.avatar;

    if (req.file) {
      console.log("--- REQ FILE OBJECT ---", req.file);
      avatarPath = req.file.path;
      console.log("--- CLOUDINARY URL ---", avatarPath);
    }

    await checkUser.update({
      name: name || checkUser.name,
      email: email || checkUser.email,
      role: role || checkUser.role,
      avatar: avatarPath
    });

    return res.status(200).json({
      message: "User Updated successfully",
      data: {
        id: checkUser.id,
        name: checkUser.name,
        email: checkUser.email,
        role: checkUser.role,
        avatar: checkUser.avatar
      },
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    
    let checkUser = await USER.findByPk(userId);

    if (!checkUser) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    
    await checkUser.destroy();

    return res.status(200).json({
      message: "Successfully Deleted User",
      data: {
        id: userId
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

const updateRole = async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.params.id;

    let checkUser = await USER.findByPk(userId);

    if (!checkUser) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    await checkUser.update({ role });

    return res.status(200).json({
      message: "User role updated successfully",
      data: {
        id: checkUser.id,
        role: checkUser.role
      },
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {getAllUsers , getUser , register , login , updateUser, deleteUser , getMe , updateRole}