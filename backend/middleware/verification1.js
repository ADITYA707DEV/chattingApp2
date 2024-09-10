const jwt = require("jsonwebtoken")
const jwt_secret1 = process.env.JWT_SECRET_1
const User = require("../models/userAcc")

const verification1 = async (req,res,next)=>{
    try {
        const token = req.cookies.imp
    const decoded = await jwt.verify(token,jwt_secret1)
    const user = await User.findOne({_id:decoded.user_id})
    
    
    if(!user){
      return   res.status(400).send({message:"user does not exist"})
    }
  
    next()
    } catch (error) {
        console.log(error)
        res.status(400).send({message:"no valid token"})
    }
    

}

module.exports = verification1