import React from 'react'
import { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'
import { setAlert } from '../redux/AlertSlice'
import { updateUserDetail } from '../redux/userDetailSlice'
import { updateGroupMembers } from '../redux/groupData'


function UpdateGroup(props) {
  const groupData = useSelector((state) => { return state.groupData })
  console.log("this is groupdate")
  console.log(groupData)
  const userMembers = useSelector((state) => { return state.userDetail.userMembers })
  const userdetail = useSelector((state) => { return state.userDetail.userDetail })
  const [pic,setPic] = useState(null)
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(false)
  const [groupInfo, setGroupInfo] = useState({ members: [] })

  const handlePic = (e)=>{
   
    setPic(e.target.files[0])
    

} 
  
const updateGroupPic = async ()=>{

  if(pic !== null&& pic !== undefined){
    let data = new FormData()
    data.append("file",pic)
  setLoading(true)
    const response1 = await axios({
        url:"http://localhost:5000/account/grouppic",
        method:"POST",
        withCredentials:true,
        params:{
           admin: userdetail.email,
           groupname:groupData.groupname
        },
        data:data
    })
 
    setLoading(false)
    if(response1.status === 200){

      props.setChatProfilePic(response1.data.profilePic)
      dispatch(updateUserDetail({groupsUpdate:true,newGroups:response1.data.newGroups.groups}))
       dispatch(setAlert({show:true,text:"successfully updated",heading:"success!"}))
    }else{ dispatch(setAlert({show:true,text:"some error occurred",heading:"error!"}))}

  }
}
  
  const defaultClass = () => {
    const a = document.getElementById("menu1")
    const b = document.getElementById("menu2")
    a.classList.add("hidden")
    b.classList.remove("hidden")
  }
  const toggleClass = (e) => {
    const parentDiv = (e.target.parentNode).offsetParent
console.log(parentDiv)
    const b = parentDiv.nextSibling
    console.log(parentDiv)
   console.log(b)
    // parentDiv.classList.toggleClass("hiddin")
    parentDiv.classList.add("hidden")

    b.classList.remove("hidden")
  }

  const handleAddMembers = (e) => {
    console.log("this id the running")
    if ((groupInfo.members).find(user => user === e.target.value)) {
      return setGroupInfo({
        members: (groupInfo.members).filter((item) => {
          return item !== e.target.value
        })
      })

    }
    return setGroupInfo({ members: (groupInfo.members).concat(e.target.value) })

  }

  const handleUpdateMembers = async () => {
    defaultClass()
    const res = await fetch("http://localhost:5000/chatting/groupchat", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      cerdentials:"include",
      body: JSON.stringify({
        id: props.chatId,
        members: groupInfo.members
      })
    })
    const response = await res.json()
    console.log("this is updated members")
    console.log(response)
    if(res.status === 200){
 dispatch(updateGroupMembers({groupMembers:response.updatedGroups.members}))
    }
    
  }
  return (
    <div className='flex'>
      <div className=' drop-shadow-md bg-white border-slate-200 rounded border' id="menu2"><div className=' p-4 w-72 font-semibold' >Members</div>
        {(groupData.groupMembers).map((mem) => { return <div className=' p-4' key={mem}>{mem}</div> })}
     {props.isAdmin&&<div><div className=' p-2  '><button className='bg-green-500 text-white  hover:bg-green-300 rounded px-2 py-1 m-2' onClick={toggleClass} >Add members</button></div>
        <div className=' p-2  '>update profile pic: <input type="file" className='my-2 p-1'  onChange={handlePic}/>{!loading?<button className='bg-green-500 text-white  hover:bg-green-300 rounded px-2 py-1 m-2' onClick={updateGroupPic}>update</button>:<button className='bg-green-500 text-white font-semibold hover:bg-green-300 rounded-xl px-2 py-1 m-1'><div role="status">
    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div></button>}</div></div>}</div>
      <div className='bg-white  lg:w-2/3 border absolute left-1/4 hidden' id='menu1'><div className=' bg-white p-2 m-1 font-semibold'>members</div>

        {userMembers.map((item) => {
          if ((groupData.groupMembers).includes(item.member)) {
            return
          }

          return <div className='bg-white p-2 m-1 hover:bg-slate-300 cursor-pointer' ><input type="checkbox" value={item.member} onClick={handleAddMembers} />{item.member}</div>
        })}
        <button className='bg-green-500 text-white font-semibold hover:bg-green-300 rounded-xl px-2 py-1 m-1' disabled={(groupInfo.members).length == 0 ? true : false} onClick={handleUpdateMembers}>add</button>
      </div>
    </div>
  )
}

export default UpdateGroup
