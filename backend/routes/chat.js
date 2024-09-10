const express = require("express")
const router = express.Router()
const chat = require("../models/chat")
const message = require("../models/userMessages")
const connections = require("../models/connections")
const groupChat = require("../models/groupChat")
const User = require("../models/userAcc")
const verification1 = require("../middleware/verification1")

router.post("/groupchat",/*verification1,*/async (req,res)=>{
    
try {
   const members = req.body.members
  
    const chatId = await groupChat.create({admin:req.body.admin,members:req.body.members,groupname : req.body.groupname})
  
    await message.create({chatid: chatId._id,group:true})
    const newGroups = await connections.findOneAndUpdate({useremail:req.body.admin},{$push:{groups:{groupname:req.body.groupname,admin:true,groupchatid: chatId._id}}},{new:true}).select({groups:1,_id:0})
 
    members.map( async (mem)=>{return  await connections.updateOne({useremail:mem},{$push:{groups:{groupname:req.body.groupname,admin:false,groupchatid: chatId._id}}})})
    res.send({message:"group chat created successfully",newGroups:newGroups})
} catch (error) {

    res.status(500).send({message:"some error occurred in the server"})
}
})

router.put("/groupchat",/*verification1,*/async (req,res)=>{
    try {
        const members = req.body.members
        
        if(req.body.delete){
            // groupChat.findByIdAndUpdate({_id:req.body.chatId},{})
        }
    await  members.map(async (mem)=>{let chatId =await groupChat.updateOne({_id:req.body.id},{$push:{members:mem}})
   return  await connections.updateOne({useremail:mem},{$push:{groups:{groupname:chatId.groupname,admin:false,groupchatid: chatId._id, }}})
})
        
        await connections.updateOne({useremail:req.body.member},{$push:{groups:{groupname:req.body.groupname,admin:false}}})
     
        res.send({message:"successfully added new memeber"})
    } catch (error) {
        res.status(500).send({message:"some error occurred in server"})
 
    }

})

router.post("/deletegroupchat",async (req,res)=>{
    try {
    
        await connections.updateOne({useremail:req.body.admin})
        const members =   await  groupChat.findOne({_id:req.body.chatid}).select({members:1,_id:0})

        // members.map( async (mem)=>{return  await connections.updateOne({useremail:mem},{$pull:{groups:{groupname:req.body.groupname}}})})
       await   message.deleteOne({chatid:req.body.chatid})
        await  groupChat.deleteOne({_id:req.body.chatid})
       
        res.send({message:"group deleted successfully"})
    } catch (error) {
        res.status(500).send({message:"internal server error"})
  
    }

})

router.post("/makingchat",/*verification1,*/async (req,res)=>{
    try {
        const users = [req.body.mainUser,req.body.chatUser]
     
       const chatid =  await chat.create({Users:users})
          await message.create({chatid:chatid._id})
          let user = await User.findOne({email:req.body.mainUser})
          const newMembers = await connections.findOneAndUpdate({useremail:req.body.mainUser},{$push:{connections:{member:req.body.chatUser,profilePic:req.body.chatProfilePic}}},{new:true})
      
          await connections.updateOne({useremail:req.body.chatUser},{$push:{connections:{member:req.body.mainUser,profilePic:req.body.userProfilePic}}})
        res.send({newdetails:newMembers,newuserdetails:user})
    } catch (error) {
        res.status(500).send({message:"internal server error"})

    }
   

})

router.post("/chat",async (req,res)=>{
  
    try {
        const newMessage = await message.updateOne({chatid: req.body.chatid},{$push:{message:{dm:req.body.message,user:req.body.author}}})
        if(!newMessage){
            return res.status(400).send({message:"no chat exists"})
        }
        res.send({message:"created",messagecontent:newMessage})  
    } catch (error) {
        res.status(500).send({message:"internal server error"})
     
    }
 
})

router.post("/getmessages",/*verification1,*/async (req,res)=>{
    
    try {
        if(req.body.group){
            const id = await groupChat.findOne({groupname:req.body.groupname}).select({admin:1,_id:1,members:1})
        
       if(!id){
        return res.status(400).send({dms:null,message:"user is not a connected member"})
       }  
        const dm = await message.findOne({chatid:id._id}).select({_id:0,message:1,chatid:1,group:1})
    
  return res.send({dms:dm,groupMembers:id.members})
        }
        
        const id = await chat.find({Users:{$all: [req.body.mainUser,req.body.chatUser]}}).select({_id:1})
       if(!id){
        return res.status(400).send({dms:null,message:"user is not a connected member"})
       }  
        const dm = await message.findOne({chatid:id}).select({_id:0,message:1,chatid:1})
 
  res.send({dms:dm})
    } catch (error) {
        res.status(500).send({message:"internal server error"})
       
    }
  
})

module.exports = router
