import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    groupMembers:[],
    groupname:""
   
}

const groupDataSlice = createSlice({
name:"groupData",
initialState,
reducers:{
    setGroupData : (state,action)=>{
       
        state.groupMembers = action.payload.groupMembers
        state.groupname=  action.payload.groupname
        
        // console.log("fuck yeah")
        // console.log(state.groupMembers)
        // state.groupArray =  state.groupMembers.map((item)=>{
          
        //    return item.member
        // })
        // console.log("bye bye bye")
        // console.log(state.groupArray)
      
    },
    updateGroupMembers : (state,action)=>{
        state.groupMembers = action.payload.groupMembers
    }
}
})

export const {setGroupData,updateGroupMembers} = groupDataSlice.actions

export default groupDataSlice.reducer