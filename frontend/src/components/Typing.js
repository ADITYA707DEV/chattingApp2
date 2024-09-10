import React from 'react'
import {useSelector} from "react-redux"
import { useEffect } from 'react'

function Typing(props) {
    const isTyping = useSelector((state)=>{return state.Typing})
    const isGroupTyping = useSelector((state)=>{return state.groupTyping})
    

    useEffect(()=>{},[isTyping,isGroupTyping])
  
    const choosing = ()=>{
      
        switch(props.isgroup.isgroup){
      case true:
        return (isGroupTyping.groupTyping&&props.isgroup.name == isGroupTyping.who)&&<span className='bg-green-400 text-white font-bold px-2 py-1 h-10 w-14 rounded  mx-3'>{isGroupTyping.sender}<sup className='font-light font-sm'>typing</sup></span>;
        default:
          return (isTyping.typing&&props.clickedUser == isTyping.who)&&<span className='bg-green-400 text-white font-bold px-2 py-1 rounded  mx-3'>typing</span>;
        }
    }
  return (
    <>
  { choosing()}
    </>
  )
}

export default Typing
