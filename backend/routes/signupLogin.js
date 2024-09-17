
//this route is all about user account signup and login and related details

const express = require("express")

const router = express.Router()
const bcrypt = require("bcryptjs")
const { body,validationResult } = require('express-validator')
const User = require("../models/userAcc")
const path = require("path")
const cloudinary = require("cloudinary").v2
const groupChat = require("../models/groupChat")
const connections = require("../models/connections")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const multer = require("multer")

const jwt_secret1 = process.env.JWT_SECRET_1
const verification1 = require("../middleware/verification1")


cloudinary.config({
  cloud_name:  "dchjvals0",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname,"../","../","./frontend","/build"))
  },
  filename: function (req, file, cb) {
    const uniquePrefix = new Date().toISOString().replace(/:/g, '-') + Math.round(Math.random() * 1E9)
    cb(null,uniquePrefix + file.originalname)
  }
})

const upload = multer({ storage: storage })



//----route for user signupe
router.post("/signup",[body("username").isLength({min:5}),body("email").isEmail(),body("password").isLength({min:5})],async (req,res)=>{

    const errors = validationResult(req)
if(!(errors.isEmpty())){
    
return res.status(401).send({message:"wrong credentials entered"})
}
try {
  let user = await User.findOne({username:req.body.username})
     
  if( user){
    return  res.status(400).send({message:"please use another username"})
  }
   user = await User.findOne({email:req.body.email})
     
if( user){
  return  res.status(400).send({message:"user with this email already exists"})
}

const salt= await bcrypt.genSalt(10)

const hashPassword = await  bcrypt.hash(req.body.password,salt)


user = {
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,


}

await User.create(user)
await connections.create({user:req.body.username,useremail:req.body.email})
res.send({message:"user account created"})
} catch (error) {
    res.status(500).send({message:"internal server error"})

}
})

//-----route for uploading profile pic
router.post("/pic",verification1,upload.single("file"),async (req,res)=>{

   try {
    const token = req.cookies.imp
    const decoded = await jwt.verify(token,jwt_secret1)
    const id = decoded.user_id

if(!id){
  
 return  res.status(400).send({message:"no email id"})
}
    const user = await    User.findOne({_id:id}).select({_id:0,profilePic:1,email:1})

    if(user.profilePic.publicId != null){
      
   await  cloudinary.uploader.destroy(user.profilePic.publicId)
  }
    
    const result = await cloudinary.uploader.upload(req.file.path , {
      folder:'profile_pic'
   });
   try {
    fs.unlink(path.resolve(__dirname,"../","../","./frontend",`/build/${req.file.filename}`) ,(error)=>{
     if(error){console.log(error)}
        
      })
   } catch (error) {
    return 
   }
   
   
 await    User.findOneAndUpdate({_id:id},{"profilePic.src":result.secure_url,"profilePic.publicId":result.public_id})


const trying = await connections.updateMany({connections: {$elemMatch: {member:user.email}}},{$set:{"connections.$[elem].profilePic":result.secure_url}},{arrayFilters:[{"elem.member":user.email}]})

    res.send({message:"profile picture successfully saved",profilePic:result.secure_url})
   } catch (error) {
    res.status(500).send({message:"some error occurred"})
    console.log(error)
  
   }
  

})

router.post("/grouppic",verification1,upload.single("file"),async (req,res)=>{
  const token = req.cookies.imp
    const decoded = await jwt.verify(token,jwt_secret1)
    const id = decoded.user_id

  
  if(!id){
    
   return  res.status(400).send({message:"no email id"})
  }
     try {
      const group = await    groupChat.findOne({admin: req.query.admin,groupname:req.query.groupname}).select({_id:0,groupProfilePic:1})
  
      if(group.groupProfilePic.publicId != null){
        
      cloudinary.uploader.destroy(group.groupProfilePic.publicId)
    }
      
      const result = await cloudinary.uploader.upload(req.file.path , {
        folder:'group_profile_pic'
     });
    try {
      fs.unlink((path.resolve(__dirname,"../","../","./frontend",`/build/${req.file.filename}`) ),(error)=>{
        if(error){console.log(error)}
      })
    } catch (error) {
      return 
    }
    

   await    groupChat.findOneAndUpdate({admin:req.query.admin,groupname:req.query.groupname},{"groupProfilePic.src":result.secure_url,"groupProfilePic.publicId":result.public_id})
   
 await connections.updateMany({groups: {$elemMatch: {groupname:req.query.groupname}}},{$set:{"groups.$[elem].profilePic":result.secure_url}},{arrayFilters:[{"elem.groupname":req.query.groupname}]})
 const updatedGroup = await connections.findOne({useremail:req.query.admin}).select({_id:0,groups:1})
     
      res.send({message:"pronofile picture successfully saved",newGroups:updatedGroup,profilePic:result.secure_url})
     } catch (error) {
      res.status(500).send({message:"some error occurred"})

     }
    
  
  })
  

//----route for user login
router.post("/login",[body("email").isEmail(),body("password").isLength({min:5})],async (req,res)=>{
 
 
    const errors = validationResult(req)
    if(!(errors.isEmpty())){
    return res.status(401).send({message:"wrong credentials entered"})
    }
    try {

        let user = await User.findOne({email:req.body.email})
        if(!(user)){
          return   res.status(401).send({message:"user does not exist"})
        }
        const passwordCompare = await bcrypt.compare(req.body.password,user.password,)
        
        if(!(passwordCompare)){
           return  res.status(401).send({message:"password is incorrect"})
        }
        const token = jwt.sign({user_id:user._id},jwt_secret1)
         const members = await connections.find({useremail:req.body.email}).select({connections:1,_id:0,groups:1})
        
         res.cookie("imp",token,{
            httpOnly: true,
          
           })
      
       user.password = undefined
     
           if(members.length < 1){
            res.send({message:"verified",user:user,members:[],groups:[]})
           }
        res.send({message:"verified",user:user,members:members[0].connections,groups:members[0].groups})
    } catch (error) {
        res.status(500).send({message:"internal server error"})
    console.log(error)
    }
   

})


router.post("/getUser",async (req,res)=>{
   try {
    query = await User.findOne({email:req.body.queryUser}).select({_id:0,username:1,email:1,profilePic:{src:1}})
   
    if(!query){
       return  res.status(400).send({message:"there is no such user!",queryUser:null})
    }
    res.send({queryUser:query})
   } catch (error) {
    res.status(500).send({message:"internal server error"})

   }

})

router.get("/userlogout",verification1,async(req,res)=>{
  try {
    res.clearCookie("imp")
  
    res.send({message:"successfully deleted cookies"})
  } catch (error) {
    res.status(500).send({message:"some error occurred"})
  
  }
 
})
// route to get user data

// router.post("/getuserdata",body("email").isEmail(),async (req,res)=>{
//     const errors = validationResult(req)
//     if(!(errors.isEmpty())){
//         console.log(errors)
//     return res.status(401).send({message:"wrong credentials entered"})
//     }
//     try {
//         const user = User.findOne({email:req.body.email})
//         if(!user){
//             return res.status(401).send({message:"user does not exist"})
//         }
    
//         res.send({user:user})
        
//     } catch (error) {
//         res.status(500).send({message:"internal server error"})
//     }
  
// })

module.exports = router