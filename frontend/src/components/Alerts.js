import React from 'react'
import  {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useSelector,useDispatch } from 'react-redux'
import { resetAlert } from '../redux/AlertSlice'


function Alerts() {
  const dispatch = useDispatch()
  const showAlert = useSelector((state)=>{return state.Alert})
 
    const reset = ()=>{
      dispatch(resetAlert())
    }
  return (
   <>
  
      {showAlert.show&&<div className=' w-1/3 absolute top-0 z-10 left-1/3 bg-green-500 text-white rounded-md p-3 overflow-hidden flex-col justify-center'><div className='font-mono'>{showAlert.heading}</div><div className='font-mono'>{showAlert.text}</div><FontAwesomeIcon icon={faXmark} onClick={reset} className='absolute top-2 cursor-pointer right-4'/></div>}
</>
  )
}

export default Alerts
