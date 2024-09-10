import React from 'react'
import { useState } from 'react'
import { connectToSocket } from '../redux/ConnectingSocketSlice'
import { useDispatch } from 'react-redux'
import { makingEvent } from '../redux/chatSlice'
import { setAuth } from '../redux/authSlice'
import { setUserDetail } from '../redux/userDetailSlice'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Alerts from './Alerts'
import { setAlert } from '../redux/AlertSlice'


function Loginpage() {
  const navigate = useNavigate(null)
   const dispatch = useDispatch()
  const [userCredentials, setUserCredentails] = useState(null)
  

  const handleOnChange = (e) => {
    setUserCredentails({ ...userCredentials, [e.target.name]: e.target.value })
    
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    const response =  await fetch("http://localhost:5000/account/login", {
      method: "POST",
      headers: {
           "Content-Type":"application/json"
      },
      credentials: 'include',
      body: JSON.stringify({
        email:  userCredentials.email,
        password:   userCredentials.password
  
  
      })
    })
    const res = await response.json()
  
 
    if(response.status == 200 ){
    

      dispatch(setUserDetail({user:res.user,members:res.members,groups:res.groups}))
      dispatch(setAuth(true))
      dispatch(connectToSocket())
      dispatch(makingEvent({event:"setup",data:res.user}))
      dispatch(setAlert({show:true,text:res.message,heading:"success!"}))
   
      
      navigate("/")
    }else{   dispatch(setAlert({show:true,text:res.message,heading:"error!"}))}
     
  }

  return (
    <>
    <Alerts></Alerts>
    <div className='bg-green-200 w-full h-screen flex  justify-center items-center'>

      <div className='bg-white rounded-md md:h-3/6 py-2 flex lg:w-1/5 flex-col  justify-center items-center'>
        <div className='font-bold text-4xl text-green-400 p-2'>Login</div>
        <form className='flex flex-col items-center w-2/3' onSubmit={handleOnSubmit} >
          <input type="text" className='border-1 w-full font-light  p-2 my-2 bg-slate-200' placeholder='email' name='email' onChange={handleOnChange}  required={true}/>
          <input type="text" className='border-1 w-full  font-light p-2 my-2 bg-slate-200' placeholder='password' name='password' onChange={handleOnChange} required={true}  />
          <button type='submit' className='bg-green-400 rounded px-2 py-3 text-white block w-full'>Login</button>
        </form>
        <div className='font-thin my-1 w-3/4 sm:full sm:text-sm text-xs text-center'>
         <p className='text-wrap' > not a user?<Link className='text-green-400' to={"/signup"}>Signup</Link> now</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Loginpage
