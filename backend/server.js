const express = require("express")
const path = require("path")
const env =  require('dotenv')
env.config({path:path.join(__dirname,'../.env')})
const app = express()

const connectToMongo = require("./db")
const cookieParser = require("cookie-parser")

const port = process.env.PORT ||5000
const cors = require("cors")


connectToMongo()
const http = require("http").Server(app)
const io = require("socket.io")(http, {

  cors: ["http://localhost:3000","https://justchatting-sr35.onrender.com","http://localhost:5000"],
})

const accountRoute = require("./routes/signupLogin")

const chattingRoute = require("./routes/chat")

// app.use(session({
//   secret:"behold the secret",
//   saveUninitialized: false,
//   resave:true
// }))
app.use(cookieParser())

app.use(cors({
  credentials: true,

  origin: ["http://localhost:3000","https://justchatting-sr35.onrender.com","http://localhost:5000"]
}))

app.use(express.json())

app.use("/account", accountRoute)
app.use("/chatting", chattingRoute)

//---deployment---//
const __dirname1 = path.resolve()


if(process.env.NODE_ENV == "production"){
  
  app.use(express.static(path.join(__dirname1,"./frontend/build")))

  app.get("*",(req,res)=>{
    try {

      res.sendFile(path.resolve(__dirname1,"./","frontend","build","index.html"))
      
    } catch (error) {
      res.status(400).send({message:"file not found"})
    
    }
   
  })
}

//--deployment--//


io.on("connection", (socket) => {



  socket.on("setup", (userdata) => {

    socket.join(userdata.email);
  })

  socket.on("join chat", (data) => {



    // if (!(rooms.includes(data.user))) {


    //   rooms.push(data.user)
    //   socket.join(data.user)
    
    // }
    socket.join(data.user)
  })


  socket.on("messaging", (message) => {

    socket.to(message.receiver).emit(`messageFor${message.receiver}`, message)
  })


  socket.on("isNotTyping", (data) => {
    
    if(data.group){
      return socket.to(data.groupName).emit(`forGroup`, { boolean: false,user:data.groupName })
    }
    socket.to(data.user).emit(`for${data.user}`, { boolean: false,user:data.sender })
  })


  socket.on("isTyping", (data) => {
    
    if(data.group){
     
      return socket.to(data.groupName).emit(`forGroup`, { boolean: true,user:data.groupName,sender:data.sender })
    }
    socket.to(data.user).emit(`for${data.user}`, { boolean: true,user:data.sender })
  })
   socket.on("leave room",(data)=>{
      
         socket.leave(data.user)
     })
socket.on("join groupchat",(groupname)=>{

    socket.join(groupname.name)
    
})
socket.on("group messaging",(data)=>{

  socket.to(data.name).emit(`group`,data)
})

socket.on("disconnect",()=>{

})


})



http.listen(port, () => {

})