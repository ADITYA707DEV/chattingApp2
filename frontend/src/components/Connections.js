import React, { useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import ConnectionCards from './ConnectionCards'
import { useDispatch } from 'react-redux'
import MemberCrads from './MemberCrads'
import Search from './Search'
import GroupChatDD from './GroupChatDD'
import  {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCircleUser} from "@fortawesome/free-solid-svg-icons"
import Profile from './Profile'
import { getMessage } from '../redux/ReceivingMessageSlice'
import { userTyping } from '../redux/TypingSlice'
import { getGroupMessage } from '../redux/groupMessages'
import { groupTypingAsync } from '../redux/groupTypingSlice'




function Connections() {

  const userdetail = useSelector((state) => { return state.userDetail.userDetail })

  const dispatch = useDispatch()
  const searchedUser = useSelector((state) => { return state.queryUser.searchedUser })

  const [showGroupElement,setGroupElement] = useState(false)
  const [showProfileElement,setshowProfileElement] = useState(false)


const groupElementVisibility = ()=>{
  if(showGroupElement === false){
    setGroupElement(true)
  }
  else{
    setGroupElement(false)
  }
}




  const handleOffCanvas = ()=>{
    if(showProfileElement === false){
      setshowProfileElement(true)
    }
    else{
      setshowProfileElement(false)
    }
  }

  
  useEffect(()=>{
   
    
 

    
    dispatch(getMessage(userdetail.email))
    dispatch(userTyping(userdetail.email))
    dispatch(getGroupMessage())
    dispatch(groupTypingAsync())

    })
    
    
  
  



  
    
    
  // const location = useLocation()
  // console.log(location.state)

  //   const getUserData = async  ()=>{
  //     const res = await fetch("http://localhost:5000/account/getuserdata",{
  //       method:"POST",
  //       headers:{
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         email:"sandhuaditya322@gmail.com"
  //       })
  //     })
  //   }

  return (
    <>
      
    <div className="flex">
   
      <div className="md:w-1/4  w-2/6">
        <div className='md:p-3 p-1 border-2 w-full '>
          <div id='profile' className='border p-0.5 flex  '>
            <span><FontAwesomeIcon icon={faCircleUser} className='mx-2 cursor-pointer h-6' onClick={handleOffCanvas} />{/*<img src="" alt="" className='w-2/12 h-5/6 rounded-2xl ' />*/}</span>
            <div className='font-normal text-sm '>{userdetail.username}</div>
            {showProfileElement&&<div className='absolute left-2  w-1/4 bg-white shadow-md  rounded-md '>{<Profile handleOffCanvas={handleOffCanvas}></Profile>}</div>}
          
          </div>
          <button className="bg-green-500 text-white text-xs md:text-sm  font-semibold inline hover:bg-green-300 rounded-xl px-2 py-1 my-2" onClick={groupElementVisibility}>New group +</button>
     
          <div className='font-bold text-2xl h-12 p-2 '>
            Chats
          </div>
          <div className='my-2 '>
          <Search  ></Search>
          </div>


        </div>
      
      </div>
  
    {showGroupElement&&<div className='w-3/4 z-20'><GroupChatDD groupElementVisibility={groupElementVisibility}></GroupChatDD></div> }
    </div>
        {searchedUser == null ? <MemberCrads ></MemberCrads>
          : <ConnectionCards></ConnectionCards>}
          </>
  )
}

export default Connections
