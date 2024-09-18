import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAlert } from '../redux/AlertSlice'
import { useNavigate } from 'react-router-dom'
 
import Alerts from './Alerts'


function Singuppage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userCredentials, setUserCredentails] = useState(null)





    const handleOnChange = (e) => {
        setUserCredentails({ ...userCredentials, [e.target.name]: e.target.value })

    }


    const handleSubmit = async (e) => {
        e.preventDefault()


        const response2 = await fetch("https://chattingapp2.onrender.com/account/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: userCredentials.username,
                email: userCredentials.email,
                password: userCredentials.password


            })
        })
        const res2 = await response2.json()
        
        if(response2.status === 200){        dispatch(setAlert({show:true,text:res2.message,heading:"success!"}))
            navigate("/login")
        }else{      dispatch(setAlert({show:true,text:res2.message,heading:"error!"}))}

    }

    return (
        <>
     <Alerts></Alerts>
            <div className='bg-green-200 w-full h-screen flex justify-center items-center'>

                <div className='bg-white  rounded-md md:h-3/5 p-2 lg:w-1/5  flex-col justify-center items-center'>
                    <div className='font-bold text-4xl p-2 text-green-400 text-center'>Signup</div>
                    <form className='flex flex-col items-center m-auto w-2/3' onSubmit={handleSubmit}>
                        <input type="text" className='border-1  w-full font-light  p-2 my-2 bg-slate-200' minLength={5} placeholder='username' name='username' onChange={handleOnChange}  required={true}/>
                        <input type="text" className='border-1 w-full font-light  p-2 my-2 bg-slate-200' placeholder='email' name='email' onChange={handleOnChange}  required={true}/>
                        <input type="text" className='border-1  w-full  font-light p-2 my-2 bg-slate-200' minLength={5} placeholder='password' name='password' onChange={handleOnChange} required={true} />
                        {/* <span className='font-light '>profie pic</span>                 
                    <input type="file" className='border-1 w-full  font-light p-2 my-2 bg-slate-200' placeholder='for profile' onChange={handlePic} /> */}
                        <button type='submit' className='bg-green-400 rounded px-2 py-3 text-white block w-full'>Signup</button>
                    </form>
                    <div className='font-thin my-1 text-center px-2'>
                    <p className='text-wrap'>already have an account?<Link className='text-green-400' to={"/login"}>login</Link></p>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Singuppage
