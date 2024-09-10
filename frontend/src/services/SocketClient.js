import { io } from "socket.io-client";

class SocketClient{
socket;

connect(){
    this.socket = io.connect("http://localhost:5000")
    return new Promise((resolve,reject)=>{
        this.socket.on("connect",()=>{resolve()})
        this.socket.on("connect_error",(error)=>{reject(error)})
    })
}

disconnect(){
  this.socket.disconnect()
    return new Promise((resolve)=>{
      this.socket.on("disconnect",()=>{
        this.socket = null
        resolve()
      })
    })
}

emit(event,data){

return new Promise((resolve,reject)=>{
    if(!this.socket) return reject("no web socket connection")


   return this.socket.emit(event,data,(response)=>{
    if(response.error){
      return reject("some error occurred")
    } 
    return resolve()
  })
})

}

on(event, data) {
  // No promise is needed here, but we're expecting one in the middleware.
  return new Promise((resolve, reject) => {
    if (!this.socket) return reject('No socket connection.');

    this.socket.on(event, data);
    resolve();
  });
}
}

export default SocketClient