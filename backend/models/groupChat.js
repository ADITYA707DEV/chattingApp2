const mongoose = require("mongoose")
const { Schema } = mongoose


const groupChatSchema = new Schema({
   
    admin: {
        type: String,

        require: true, 
      
    },
    members:[String],
    groupname:{
        type: String 
    },
    groupProfilePic:{
        src:{type:String,
        default:null},
        publicId:{
            type:String,
            default:null
        }
      
    }
    
})


const groupChat = mongoose.model("groupChatId",groupChatSchema)

module.exports = groupChat