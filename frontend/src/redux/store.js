import {configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import queryUserSlice from "./queryUserSlice"
import userDetailReducer from "./userDetailSlice"
import groupDataReducer from "./groupData"
import ConnectingSocketSlice from "./ConnectingSocketSlice"
import chatSlice from "./chatSlice"
import ReceivingMessageSlice from "./ReceivingMessageSlice"
import TypingReducer from "./TypingSlice"
import groupMessagesReducer from "./groupMessages"
import groupTypingReducer from "./groupTypingSlice"
import FilterReducer from "./FilterSlice"
import AlertReducer from "./AlertSlice"


export const store = configureStore({
    reducer:{

        auth : authReducer,
        groupData: groupDataReducer,
        userDetail:userDetailReducer,
        queryUser: queryUserSlice,
        chat: chatSlice,
        socketConnection: ConnectingSocketSlice,
        ReceivingMessage: ReceivingMessageSlice,
        Typing: TypingReducer,
        groupMessages: groupMessagesReducer,
        groupTyping: groupTypingReducer,
        Filter: FilterReducer,
        Alert: AlertReducer
    }
})