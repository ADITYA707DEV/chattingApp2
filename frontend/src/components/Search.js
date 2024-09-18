import React from 'react'
import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { setQueryUser } from '../redux/queryUserSlice'
import { resetQueryUser } from '../redux/queryUserSlice'
import { setFilter } from '../redux/FilterSlice'
import { setAlert } from '../redux/AlertSlice'

function Search() {
  const [search, setSearch] = useState({ email: "" })
  const filters = useSelector((state)=>{ return state.Filter})
  const userdetail = useSelector((state) => { return state.userDetail.userDetail })
    const memberArray = useSelector((state)=>{return state.userDetail.memberArray})

        
    const dispatch = useDispatch()



    const handleRemoveSearch = () => {
        if(filters.isFilter){
          dispatch(setFilter({isFilter: false , filteredUser:""}))
        }
        setSearch({ email: "" })
        dispatch(resetQueryUser())
    
      }


      const handleOnChange = (e)=>{
        setSearch({email: e.target.value})
      }
    const handleOnSubmit = async (e) => {
        e.preventDefault()
      
    if(search.email === userdetail.email){
      return 
    }
    else if(memberArray.includes(search.email)){
      return  dispatch(setFilter({isFilter: true , filteredUser: search.email}))
    }
    
        const res = await fetch("https://chattingapp2.onrender.com/account/getUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            queryUser: search.email
          })
        })
        const response = await res.json()
    
    if(res.status !== 200){
      dispatch( setAlert({show:true,text:response.message,heading:"error!"}))
    }
        dispatch(setQueryUser(response.queryUser))
    
      }
  return (
  <div>
    <form onSubmit={handleOnSubmit} className='w-full text-center md:text-left'>
              <input type="email" className='border rounded p-1 md:3/5 w-4/6 font-xs md:font-sm' placeholder='search by email' value={search.email} onChange={handleOnChange} /><button type="button" className=' px-1 font-bold bg-green-500 rounded-xl text-white hover:bg-green-300 ' onClick={handleRemoveSearch}>x</button>
              <button type='submit' className="bg-green-500 text-white w-12 md:w-14 text-xs md:text-sm font-semibold hover:bg-green-300 rounded-xl px-2 py-1 m-1">search</button>
            </form>
            </div>
  )
}

export default Search
