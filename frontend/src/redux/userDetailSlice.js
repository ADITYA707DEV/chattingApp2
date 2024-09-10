import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userDetail:{},
    userMembers:[],
    groups:[],
    memberArray: []
}

const userDetailSlice = createSlice({
name:"userDetail",
initialState,
reducers:{
    setUserDetail : (state,action)=>{
        state.userDetail = action.payload.user
        state.userMembers = action.payload.members
      state.groups= action.payload.groups
      state.memberArray = action.payload.members.map((item)=>{
        console.log("these are my mehnta yeeeee")
        console.log(state.groups)
        
       return (item.member)
  
        
      })
  
    },
    updateUserDetail: (state,action)=>{
        if(action.payload.groupsUpdate){
              state.groups = action.payload.newGroups
              return state
        }
      
        state.userDetail.profilePic.src = action.payload.profilePic
      
    },
    resetUserDetail:()=>{
        return initialState
    }
   

}

})

export const {setUserDetail,resetUserDetail,updateUserDetail} = userDetailSlice.actions

export default userDetailSlice.reducer