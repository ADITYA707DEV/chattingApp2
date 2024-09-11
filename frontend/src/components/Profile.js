import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { updateUserDetail } from '../redux/userDetailSlice'
import { useSelector, useDispatch } from 'react-redux'
import { resetUserDetail } from '../redux/userDetailSlice'
import { disonnectToSocket } from '../redux/ConnectingSocketSlice'
import { setAlert } from '../redux/AlertSlice'

function Profile(props) {
  const ref = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userdetail = useSelector((state) => { return state.userDetail.userDetail })
  const [loading,setLoading] = useState(false)
  const [pic, setPic] = useState(null)


  const handlePic = (e) => {
    setPic(e.target.files[0])


  }

  const handleLogOut = () => {
    dispatch(disonnectToSocket())
    dispatch(resetUserDetail())

    navigate("/login")

  }

  const handleOncClick = async () => {

    if(pic !== null && pic !== undefined){
    let data = new FormData()
    data.append("file", pic)
setLoading(true)
    const response1 = await axios({
      url: "https://justchatting-sr35.onrender.com/account/pic",
      method: "POST",
      withCredentials: true,
      data: data
    })
 setLoading(false)
  
    if (response1.status === 200) {
      dispatch(setAlert({ show: true, text: "image uploaded successfuly", heading: "success!" }))
      dispatch(updateUserDetail({ profilePic: response1.data.profilePic }))

    }
  }
  }
  return (
    <div className='p-6 '>
      <FontAwesomeIcon icon={faXmark} onClick={props.handleOffCanvas} className="absolute right-5 text-green-400 md:h-7 h-4 cursor-pointer" />
      <div className=''>{userdetail.profilePic.src == null ? <FontAwesomeIcon icon={faCircleUser} className='h-20  text-slate-500 block  ' /> : <img src={userdetail.profilePic.src} className='w-1/2   border-green-300 border-4 rounded-tr-lg my-2' />}<input type="file" ref={ref} onChange={handlePic} className= 'w-full text-xs md:text-sm md:w-2/3 md:my-2' />
        {!loading?<button className='bg-green-500 text-white font-semibold hover:bg-green-300 rounded-xl md:px-2 md:py-1 m-1 text-xs p-1 md:text-base' onClick={handleOncClick}>submit</button>:<button className='bg-green-500 text-white font-semibold hover:bg-green-300 rounded-xl md:px-2 md:py-1 m-1 p-1'><div role="status">
    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div></button>}</div>
      <div className='font-semi bold md:text-2xl text-md my-4'>{userdetail.username}</div>
      <div className=""><span className='font-thin text-xs md:text-base block '>email</span><span className='text-font-xxs md:text-lg block '><p className='break-all'>{userdetail.email}</p></span></div>
      <hr className="my-4 md:my-6" />
      <button className='bg-green-500 text-white font-semibold hover:bg-green-300 rounded-xl md:px-2 md:py-1 md:text-base text-xs p-1' onClick={handleLogOut}>logout</button>
    </div>
  )
}

export default Profile

