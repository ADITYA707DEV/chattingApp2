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
    const [loading,setLoading] = useState(false)




    const handleOnChange = (e) => {
        setUserCredentails({ ...userCredentials, [e.target.name]: e.target.value })

    }


    const handleSubmit = async (e) => {
        e.preventDefault()
   setLoading(true)

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
        setLoading(false)
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
                          {!loading?<button className='bg-green-500 text-white font-semibold hover:bg-green-300 rounded w-full md:px-2 md:py-1 m-1 text-xs p-1 md:text-base' onClick={handleSubmit}>signup</button>:<button className='bg-green-500 text-white font-semibold hover:bg-green-300 rounded w-full md:px-2 md:py-1 m-1 p-1'><div role="status">
    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div></button>}
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
