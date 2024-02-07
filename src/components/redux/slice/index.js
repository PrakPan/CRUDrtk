
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk,isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';

const url ="https://65bbd64452189914b5bd2f65.mockapi.io/api/crud";
export const create = createAsyncThunk("create",async (data)=>{
  console.log(data);
    try {
        const response = await axios.post(url,data);
        console.log(response);
        console.log("CREATED");
        return response.data;

    }catch(error){
           isRejectedWithValue(error.response);
    }
})

export const read = createAsyncThunk("read",async (data)=>{
    try {
        const response = await axios.get(url,data);
        // console.log(response.data);
        return response.data;

    }catch(error){
           isRejectedWithValue(error.response);
    }
})

export const update = createAsyncThunk("update",async (data)=>{
  // console.log(data);
    try {
        const response = await axios.put(`https://65bbd64452189914b5bd2f65.mockapi.io/api/crud/${data.id}`,data);
        console.log("UPDATED");
        // console.log(response);
        return response.data;

    }catch(error){
           isRejectedWithValue(error.response);
    }
})

export const deleteUser = createAsyncThunk("delete",async (data)=>{
  // console.log(data);
    try {
        const response = await axios.delete(`https://65bbd64452189914b5bd2f65.mockapi.io/api/crud/${data.id}`,data);
        // console.log(response.data);
        // console.log("DELETD");
        return response.data;

    }catch(error){
           isRejectedWithValue(error.response);
           console.log("ERROR");
    }
})

const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData: [],
    success: false,
    fetchDone: false,
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(create.pending, (state) => {
        state.loading = true;
      })
      .addCase(create.fulfilled, (state, action) => {

        console.log(state);
        console.log(action.payload);
        // console.log(state.users);
        state.loading = false;
        state.success =true;
        state.users=[action.payload,...state.users];
        
      })
      .addCase(create.rejected, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(read.pending, (state) => {
        state.loading = true;
      })
      .addCase(read.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.success=false;
        state.fetchDone=true;
      })
      .addCase(read.rejected, (state, action) => {
        state.loading = true;
        state.users = action.payload;
      })
      .addCase(update.pending, (state) => {
        state.loading = true;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((element) =>{
          return element.id === action.payload.id ? action.payload : element;
        }
        );

      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;

        if (id) {
          state.users = state.users.filter((element) => element.id !== id);
        }

        console.log("delete action", action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = true;
        state.users = action.payload;
      });
  },
});

export const { searchUser } = userDetail.actions;
export default userDetail.reducer;