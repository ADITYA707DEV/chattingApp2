import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { socketclient } from "../index";

const initialState = {
    connectionStatus: ""
}

export const connectToSocket = createAsyncThunk("connectToSocket",async ()=>{
    return await socketclient.connect()
})

export const disonnectToSocket = createAsyncThunk("disconnectToSocket",async ()=>{
    return await socketclient.disconnect()
})

const ConnectingSocketSlice = createSlice({
    name:"socketConnection",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
       builder.addCase(connectToSocket.fulfilled,(state)=>{state.connectionStatus = "connected"})
       builder.addCase(connectToSocket.pending,(state)=>{state.connectionStatus = "pending"})
       builder.addCase(connectToSocket.rejected,(state)=>{state.connectionStatus = "connection failed"})
       builder.addCase(disonnectToSocket.fulfilled,(state)=>{state.connectionStatus = "disconnected"})
       builder.addCase(disonnectToSocket.pending,(state)=>{state.connectionStatus = "disconnecting"})
       builder.addCase(disonnectToSocket.rejected,(state)=>{state.connectionStatus = "disconnection failed"})
    }
})

export default ConnectingSocketSlice.reducer