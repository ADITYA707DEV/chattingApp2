const mongoose = require("mongoose")
const { Schema } = mongoose


const connectionsSchema = new Schema({
    user: {
        type: String,
        unique:true,
        require: true, 
      
    },
    useremail:{
        type:String,
        unique:true,
        required:true

    },
    connections:[{member:{
       type: String,

       require:true,
       _id:false
    },
    profilePic:{
        type:String,
        default:null
    }
      
    }],
    groups:[{
     groupname:{  type: String,},
     admin:{type:Boolean},
     groupchaid: {type: mongoose.Schema.Types.ObjectId},
     profilePic:{
        type:String,
        default:null
    }

    }]
})


const connections = mongoose.model("connections",connectionsSchema)

module.exports = connections