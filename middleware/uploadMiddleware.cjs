const multer = require("multer")


    let storage = multer.diskStorage({

        destination:(req, file, callback)=>{
            callback(null, "uploads/" )
        },

        filename: (req, file, callback)=>{
            let sanitized = file.originalname.replace(/\s+/g, "-")
            callback(null, Date.now()  + "-" + sanitized)
        }
    })


    let fileFilter = (req, file, callback)=>{

        if (file.mimetype.startsWith("image/")) {
            
                callback(null, true)
        } else {
            callback(new Error("Please upload an image file"), false)
        }
    }


    let upload = multer({
        storage,
        fileFilter,
        limits:{
            fileSize: 5 * 1024 * 1024
        }
    })


    module.exports = upload