//----function to connect to database

const mongoose = require("mongoose")

const mongoURI = process.env.MONGO_URI

const connectToMongo = async () => {
 
  
    mongoose.connect(mongoURI).then(() => {
        
    }).catch((error) => { console.log(error) })
}

module.exports = connectToMongo