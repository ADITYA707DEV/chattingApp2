import React from 'react'

import { makingEvent } from '../redux/chatSlice'
import { useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import UpdateGroup from './UpdateGroup'
import Typing from './Typing'
import { setMessage } from '../redux/ReceivingMessageSlice'
import { setGroupMessage } from '../redux/groupMessages'






function Messages(props) {
  const {setChatProfilepic} = props

  const userdetail = useSelector((state)=>{return state.userDetail.userDetail})
 
  const newMessageArray = useSelector((state)=>{return state.ReceivingMessage.message})
  const newGroupMessageArray = useSelector((state)=>{return state.groupMessages.message})

const dispatch = useDispatch()




  const [messageData,setMessageData ] = useState(null)
  const handleOnChange = (e)=>{
     setMessageData(e.target.value)
  }

  
const toggleMenu = ()=>{
let menu = document.getElementById("toggleMenu")
menu.classList.toggle("hidden")
}


 
  const sendMessage = async  (e)=>{
    e.preventDefault()
   const res  = await fetch("http://localhost:5000/chatting/chat",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
         author:userdetail.email,
         chatid: props.chatId,
         message: messageData
    })
   })

if(props.isgroup.isgroup){
  dispatch(setGroupMessage({message:messageData,sender:userdetail.email,name:props.isgroup.name}))
  return dispatch(makingEvent({event:"group messaging",data:{name:props.isgroup.name,message:messageData,sender:userdetail.email}}))
}
dispatch(setMessage({message:messageData,sender:userdetail.email}))
dispatch(makingEvent({event:"messaging",data:{message:messageData,sender:userdetail.email,receiver:props.clickedUser}}))

  }
 

 
 
  // const emitting = ()=>{
  //   socket.emit("message",messageData)
   

  // }

  return (
    <div className='' >
      <div id='nav' className=' h-12  border'>
        <div >
            <ul className='flex'>
                <li>
                  <div className=' bg-slate-300 mx-2 w-10 cursor-pointer rounded-full overflow-hidden' onClick={toggleMenu}><img  className="object-cover h-10" src={props.chatPic != null?props.chatPic:""}alt="" /></div>
              <div id='toggleMenu' className='hidden'>{(props.isgroup.isgroup)&&<UpdateGroup chatId={props.chatId} isAdmin ={props.isgroup.isAdmin} setChatProfilePic={setChatProfilepic}></UpdateGroup>}</div> 
                </li>
                <li className='self-center font-semibold'>
          { props.isgroup.isgroup?props.isgroup.name:props.clickedUser}
                </li>
            </ul>
        </div>
      </div>
      <div id='mainContent' className='flex flex-col'>
        {(((props.dm).length) > 0)&&(props.dm).map((item,i)=>{return (item.user === userdetail.email )?<div id='messageBox' key={item._id} className='bg-gray-200 rounded max-w-40 md:max-w-60 m-3'>
          <p className="break-all">{item.dm}</p>
        </div>:<div id='messageBox' key={item._id}  className='p-1 bg-gray-200 rounded max-w-40 md:max-w-60 m-3 self-end'>
           {props.isgroup.isgroup?<><div className='bg-green-400 text-white rounded-2xl px-0.5 text-xs '>{item.user}</div> <p className="break-all">{item.dm}</p></>:item.dm}
        </div>})}
        {
          props.isgroup.isgroup?   (newGroupMessageArray.length) > 0?newGroupMessageArray.map((item)=>{
            if(item.name == props.isgroup.name ){
              if(item.sender == userdetail.email){
                return  <div id='messageBox' className='bg-gray-200 p-1 rounded max-w-40 md:max-w-60 m-3 '>
                 <p className="break-all">{item.message}</p>
             </div>
              }
              return <div id='messageBox' className='bg-gray-200 rounded p-1  max-w-40 md:max-w-60 m-3 self-end'>
              <div className='bg-green-400 text-white rounded-2xl px-0.5  text-xs'>{item.sender}</div> <p className="break-all">{item.message}</p>
           </div>}
         
          }):<span></span>:
          (newMessageArray.length) > 0?newMessageArray.map((item)=>{
            if(item.sender == props.clickedUser ){
           return <div id='messageBox' className='bg-gray-200 rounded md:max-w-60 p-1 max-w-40 m-3 self-end'>
           <p className="break-all">{item.message}</p>
        </div>}
        else if(item.sender == userdetail.email){
          return <div id='messageBox' className='bg-gray-200 p-1 rounded max-w-40 md:max-w-60 m-3 '>
          <p className="break-all">{item.message}</p>
       </div>
        }
            
          }):<span></span>
        }
      { <span className='self-end'><Typing clickedUser={props.clickedUser} isgroup={props.isgroup}></Typing></span>}
      </div>
    
      <div className='flex justify-center my-4'>
        <form onSubmit={sendMessage} className='w-full'>
      <input type="text"  className=" border-1 bg-green-100 rounded h-9 w-4/6 p-2 md:w-5/6 font-thin" placeholder='enter message here'  onChange={handleOnChange} onFocus={()=>{  dispatch(makingEvent({event:"isTyping",data:{user:props.clickedUser,group:props.isgroup.isgroup,groupName:props.isgroup.name,sender:userdetail.email}}))}} onBlur={()=>{  dispatch(makingEvent({event:"isNotTyping",data:{user:props.clickedUser,group:props.isgroup.isgroup,groupName:props.isgroup.name,sender:userdetail.email}}))}} />
      <button type='submit' className='bg-green-500 text-white font-semibold hover:bg-green-300 rounded-xl px-2 py-1 mx-2' /*onClick={emitting}*/>send</button>
      </form>
      </div>
     
    </div>
  )
}

export default Messages
