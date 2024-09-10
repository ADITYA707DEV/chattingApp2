import React from 'react'
import Messages from './Messages'
import { useSelector,useDispatch } from 'react-redux'
import { useState,useRef,useMemo} from 'react'
import { setGroupData } from '../redux/groupData'
import { makingEvent } from '../redux/chatSlice'
import { resetMessageReceiveCart } from '../redux/ReceivingMessageSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser} from "@fortawesome/free-solid-svg-icons"

function MemberCrads() {
  const ref = useRef(0)
  const dispatch = useDispatch()
  const filters = useSelector((state)=>{ return state.Filter})
  const userMembers = useSelector((state) => { return state.userDetail.userMembers })
  const userGroups = useSelector((state)=>{ return state.userDetail.groups})
  const userdetail = useSelector((state) => { return state.userDetail.userDetail })
  const [chatId,setChatId] = useState(null)
  const [messageData,setMessageData ] = useState(null)
  const [clickedUser,setClickedUser] = useState(null)
  const [isgroup,setIsGroup] = useState({isgroup:false,name:null,isAdmin:null})
  const [chatProfilePic,setChatProfilepic] = useState(null)


 const  setClickedUserMemo = useMemo(()=>{clickedUser&&dispatch(makingEvent({event:"join chat",data:{user:clickedUser}}))},[clickedUser])
 const  setGroupEvent = useMemo(()=>{(isgroup.isgroup)&&dispatch(makingEvent({event:"join groupchat",data:{name:isgroup.name}}))},[isgroup.name])

//  const  setPreviousClickedUserMemo = useMemo(()=>{previousClickedUser&&dispatch(makingEvent({event:"leave room",data:{user:previousClickedUser}}))},[previousClickedUser])
const getGroupMessages = async  (gname,chatPic,isAdmin)=>{
  dispatch(resetMessageReceiveCart())
  const res = await fetch("http://localhost:5000/chatting/getmessages",{
    method:"POST",
    headers:{
      "Content-Type": "application/json",

    },
    credentials:"include",
    body: JSON.stringify({
      group:true,
             groupname: gname
    })
  })
const response = await res.json()


dispatch(setGroupData({groupMembers:response.groupMembers,groupname:gname}))
setIsGroup({isgroup:response.dms.group,name:gname,isAdmin:isAdmin})
setMessageData(response.dms.message)
setChatProfilepic(chatPic)
setChatId(response.dms.chatid)



}

  const handleOnClick = async (chatUser,chatPic) => {
  
   
    // if(chatUser !=  clickedUser ){
    // setPreviousClickedUser(clickedUser)
    // }

  
   dispatch(resetMessageReceiveCart())
    const res = await fetch("http://localhost:5000/chatting/getmessages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        group:false,
        mainUser: userdetail.email,
        chatUser: chatUser
    })
    })
const response = await res.json()

setMessageData(response.dms.message)
setChatId(response.dms.chatid)
setClickedUser(chatUser)
setChatProfilepic(chatPic)


setIsGroup({isgroup:response.dms.group,name:null})

  }


  return (
     <div className='flex'>
    <div className='flex container mx-1 flex-col w-2/6 md:w-1/4'>{userMembers.filter((item)=>{
           if(filters.isFilter){
            return item.member == filters.filteredUser
           }
           else{
            return item
           }
    }).map((partner) => {
      return <div key={partner.member} className='border-2 p-0.5 rounded w-full h-16 flex items-center'>
       {partner.profilePic == null?<FontAwesomeIcon icon={faCircleUser} className='h-3/6 md:5/6 md:mx-2' />:<span  className='bg-slate-300  h-3/6 rounded-full md:mx-2 overflow-hidden '><img src={partner.profilePic != null?partner.profilePic:""} className='object-cover h-full' alt="" /> </span>}
      
        <div onClick={()=>{handleOnClick(partner.member,partner.profilePic)}} className='font-semibold w-3/4 md:p-3 py-3 px-1 md:text-base text-font-xxs  cursor-pointer' ref={ref} ><p className='break-all'>{partner.member}</p></div>
      </div>
      
    })}
    {userGroups.map((groups) => {
      
      return <div key={groups.groupname} className='border-2 p-0.5 rounded w-full h-16 flex items-center '>
        {groups.profilePic == null?<FontAwesomeIcon icon={faCircleUser} className='h-3/6 md:5/6 md:mx-2' />:<span  className='bg-slate-300 h-3/6  rounded-full md:mx-2 overflow-hidden '><img src={groups.profilePic != null?groups.profilePic:""} className='object-cover h-full' alt="" /></span>}
        <div onClick={()=>{getGroupMessages(groups.groupname,groups.profilePic,groups.admin)}} className=' cursor-pointer h-full p-3 w-3/4 font-semibold text-font-xxs md:text-base' ><p className='break-all'>{groups.groupname}</p></div>
      </div>
      
    })}
    
    
    </div>
   
    {messageData&&<div className=' px-2 absolute  md:left-1/4 left-1/3 py-2 w-3/4 h-full top-0'><Messages  dm={messageData} chatId={chatId}  clickedUser={clickedUser} isgroup={isgroup} chatPic={chatProfilePic} setChatProfilepic={setChatProfilepic}></Messages></div>}

    </div>


  )
}

export default MemberCrads
