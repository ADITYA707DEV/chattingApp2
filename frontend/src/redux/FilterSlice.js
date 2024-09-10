import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    filteredUser:"",
    isFilter:false
}

const FilterSlice = createSlice({
name:"Filter",
initialState,
reducers:{
    setFilter : (state,action)=>{
        state.isFilter = action.payload.isFilter
        state.filteredUser = action.payload.filteredUser
       
      
    } 

}

})

export const {setFilter} = FilterSlice.actions

export default FilterSlice.reducer