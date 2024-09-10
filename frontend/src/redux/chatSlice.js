import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { socketclient } from "../index";

const initialState = {
  messageStatus: '', //ideally it should come from the BE
 
};

export const makingEvent = createAsyncThunk('makingEvent', async function ( {event, data} ) {

  return await socketclient.emit(event,data);
});

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(makingEvent.pending, (state) => {
      state.messageStatus = 'Sending';
    });
    builder.addCase(makingEvent.fulfilled, (state) => {
      state.messageStatus = 'Sent successfully';
    });
    builder.addCase(makingEvent.rejected, (state) => {
      state.messageStatus = 'Send failed';
    });
  },
});
export default chatSlice.reducer;