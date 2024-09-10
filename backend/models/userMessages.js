const mongoose = require("mongoose")
const { Schema } = mongoose


const userMessageSchema = new Schema({
    group:{
      type:Boolean,
      default:false
    },
    chatid: {
        type:  mongoose.Schema.Types.ObjectId,
        require: true,
        unique: true
    },
  
        
            message:[{
                user:String,
                dm:String,
                
            
            }]
      

        
    
     
})


const userMessage = mongoose.model("userMessage",userMessageSchema)

module.exports = userMessage