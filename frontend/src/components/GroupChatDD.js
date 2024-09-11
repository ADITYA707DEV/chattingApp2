import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateUserDetail } from '../redux/userDetailSlice'
import { setAlert } from '../redux/AlertSlice'

function GroupChatDD(props) {
const  navigate = useNavigate(null)
  const dispatch = useDispatch()
  const userMembers = useSelector((state) => { return state.userDetail.userMembers })
  const userdetail = useSelector((state) => { return state.userDetail.userDetail })
  const [groupInfo, setGroupInfo] = useState({ members: [], groupName: null })
  
  
  
 
 

  const defaultClass = () => {
    const a = document.getElementById("menu1")
    const b = document.getElementById("menu3")
    b.classList.add("hidden")
    a.classList.remove("hidden")
  }


  const handleAddMembers = (e) => {
    if ((groupInfo.members).find(user => user === e.target.value)) {
      return setGroupInfo({
        members: (groupInfo.members).filter((item) => {
          return item !== e.target.value
        })
      })

    }
    return setGroupInfo({ members: (groupInfo.members).concat(e.target.value) })

  }

  const settingGroupName = (e) => {
    setGroupInfo({ ...groupInfo, groupName: e.target.value })

  }

  const toggleClass = (e) => {
    const parentDiv = e.target.parentNode
    const b = parentDiv.nextSibling

    // parentDiv.classList.toggleClass("hiddin")
    parentDiv.classList.add("hidden")

    b.classList.remove("hidden")
  }

  const handleCreateGroup = async () => {
    props.groupElementVisibility()
    defaultClass()

    
    const res = await fetch("https://justchatting-sr35.onrender.com/chatting/groupchat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials:"include",
      body: JSON.stringify({
        "admin": userdetail.email,
        "members": groupInfo.members,

        "groupname": groupInfo.groupName
      })
    })
    const response = await res.json()
   if(res.status == 200){ dispatch(updateUserDetail({groupsUpdate:true,newGroups:response.newGroups.groups}))

   dispatch(setAlert({show:true,text:"all the group members will be able to view your message once they refreshed their app, app is going to refresh itself now",heading:"important!"}))
   setTimeout(()=>{
    navigate(0)
   },8000)
 
  }
   
  }


  useEffect(() => {

  }, [groupInfo.groupName])
  return (

    <div className='flex  '>

      <div className='bg-slate-200  w-1/4 border absolute left-1/4 ' id='menu1'><div className=' bg-slate-50 p-2 m-1 font-semibold'>group chat</div>
        <div className='bg-slate-50 p-2 m-1 hover:bg-slate-300 cursor-pointer' onClick={toggleClass}>new group+</div></div>
      <div className='bg-slate-200  w-1/4 border absolute left-1/4 hidden' id='menu2'><div className=' bg-slate-50 p-2 m-1 font-semibold'>members</div>
        {userMembers.map((item) => { return <div className='bg-slate-50 p-2 m-1 hover:bg-slate-300 cursor-pointer' ><input type="checkbox" value={item.member} onClick={handleAddMembers} /><p className='break-all text-font-xxs md:text-base'>{item.member}</p></div> })}
        <button className='bg-green-500 text-white font-semibold hover:bg-green-300 rounded-xl px-2 py-1 m-1' disabled={(groupInfo.members).length == 0 ? true : false} onClick={toggleClass}>next</button>
      </div>
      <div className='bg-slate-200  w-1/4 border absolute left-1/4 hidden ' id='menu3'><div className=' bg-slate-50 p-2 m-1 rounded-lg font-semibold '>group</div>
        <div className='bg-slate-50 p-2 m-1 text-xs md:text-base'>provide a group name <input type="text" className='my-2 md:p-1 w-4/5 ' onChange={settingGroupName} /></div>
      
        <button type="button" disabled={(groupInfo.groupName) == null ? true : false} className='bg-green-500 text-white font-semibold text-xs md:text-base hover:bg-green-300 rounded-xl md:px-2 md:py-1 m-1 p-1' onClick={handleCreateGroup}>create</button>
      </div>
    </div>

  )
}

export default GroupChatDD
