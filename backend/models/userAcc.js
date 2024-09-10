const mongoose = require("mongoose")
const { Schema } = mongoose


const userAccountSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email:{
       type:String,
       require:true,
       unique:true
    },
    password:{
        type:String,
        require:true,

    },
    profilePic:{
        src:{type:String,
        default:null},
        publicId:{
            type:String,
            default:null
        }
      
    }
})


const userAccount = mongoose.model("userAccount",userAccountSchema)

module.exports = userAccount