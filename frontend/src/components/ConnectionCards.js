import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useState } from 'react'
import { resetQueryUser } from '../redux/queryUserSlice'
import { setUserDetail } from '../redux/userDetailSlice'

function ConnectionCards() {
  const dispatch = useDispatch()
  const searchedUser = useSelector((state) => { return state.queryUser.searchedUser })

  const userdetail = useSelector((state) => { return state.userDetail.userDetail })
  const [messageData,setMessageData ] = useState(null)
 



  const handleOnClick = async (e) => {
    
    const res1 = await fetch("http://localhost:5000/chatting/makingchat",{
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      credentials:"include",  
      body: JSON.stringify({
        mainUser: userdetail.email,
        chatUser:searchedUser.email,
        UserProfilePic: userdetail.profilePic.src,
        chatProfilePic:searchedUser.profilePic.src
      })
    })
   const response1 = await  res1.json()

  dispatch(setUserDetail({user: response1.newuserdetails,members: (response1.newdetails).connections,groups: (response1.newdetails).groups}))
  
dispatch(resetQueryUser())
  //  dispatch(resetQueryUser())
  //   const res2 = await fetch("http://localhost:5000/chatting/getmessages", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },;]
  //     body: JSON.stringify({
  //       mainUser: userdetail.email,
  //       chatUser: searchedUser.email
  //   })
  //   })
// const response2 = await res2.json()
// console.log(response3)

// setMessageData(response2.dms.message)
// setChatId(response2.dms.chatid)


  }

 
 
  return (

    <div className='h-screen'>
      <div className='flex container h-full '>
      {searchedUser !== null ? <div id='connectionCard' className='border-2 p-0.5 rounded w-full h-16 flex-col items-center'>
        <div className='text-sm md:text-base'>{searchedUser.username}</div><div className='font-light text-xs md:text-sm '>{searchedUser.email}</div></div>: <div></div>}
        <div className=' absolute  md:left-1/4 left-1/3  w-3/4 h-full top-0  border-2'>{ messageData == null? <div className='flex justify-center bg-slate-50  items-center h-full'> <button  className='bg-green-400 border-2 border-green-300 text-white p-1 rounded mx-4 font-semibold h-12 hover:bg-green-500' onClick={handleOnClick}>connect</button></div>
  //  :<Messages  dm={messageData} chatId={chatId}  clickedUser={clickedUser} isgroup={isgroup}></Messages>}
  :<div></div>}
    </div>
      </div> 
    </div>
  )
}

export default ConnectionCards
