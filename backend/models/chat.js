const mongoose = require("mongoose")
const { Schema } = mongoose


const chatSchema = new Schema({
   
    Users: [{type:String}]
   
    
})


const chat = mongoose.model("chatId",chatSchema)

module.exports = chat