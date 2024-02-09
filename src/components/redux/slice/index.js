
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk,isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * @description  "Below are functions for get, put , delete & post tasks"
 * @summary 1. In the update function the data is destructured from the UserForm.js (line no. 49) while dispatching the updateData.
 * 2. In the  get function  the user is coming from the Read.js (line no.23) & getting the data of  user
 * 3. In the create function the params is coming from the UserForm.js (line no. 51).
 */

const url ="http://localhost:8080/";
export const create = createAsyncThunk("create",async (data)=>{
    try {
        const response = await axios.post(`${url}create`,data);
        return response.data;

    }catch(error){
         return isRejectedWithValue(error.response);
    }
})

export const read = createAsyncThunk("read",async (data)=>{
    try {
        const response = await axios.get(url,data);
        return response.data;

    }catch(error){
         return  isRejectedWithValue(error.response);
    }
})

export const update = createAsyncThunk("update",async (data)=>{
  console.log(data);
    try {
        const response = await axios.put(`${url}edit/${data.id}`,data);
        return response.data;

    }catch(error){
         return isRejectedWithValue(error.response);
    }
})

export const deleteUser = createAsyncThunk("delete",async (data)=>{
  console.log(data);
    try {
        const response = await axios.delete(`${url}${data._id}`,data);
        return response.data;

    }catch(error){
          return isRejectedWithValue(error.response);
    }
})

/**
 * @description  "Created a slice for User Details "
 * @summary 1. It includes user data in form of array 
 *          2. A loading state for showing the loader component conditionally
 *          3. A success bool value that stores true/false value if API is rejected or fulfilled
 *          
.
 */

const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    searchData: [],
    success: false,
    fetchDone: false,
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
  },

  /**
 * @description  "Below are functions for pending rejected and fulfilled states of Api's "
 * @summary 1. It includes all the logics of updating deleting & creating users array 
 *          
.
 */
  extraReducers: (builder) => {
    builder
      .addCase(create.pending, (state) => {
        state.loading = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.users=[action.payload,...state.users];
        
      })
      .addCase(create.rejected, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(read.pending, (state) => {
        state.success=false;
        state.loading = true;
      })
      .addCase(read.fulfilled, (state, action) => {
        state.success = false;
        state.loading = false;
        state.users = action.payload;
        state.fetchDone=true;
      })
      .addCase(read.rejected, (state, action) => {
        state.loading = true;
        state.users = action.payload;
      })
      .addCase(update.pending, (state) => {
        state.success=false;
        state.loading = true;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        console.log(action.payload);
        state.users = state.users.map((element) =>{
          return element._id === action.payload._id ? action.payload : element;
        }
        );

      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = false;
        state.success=false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.showModal=true;
        state.success=true;
        state.loading = false;
        const { _id } = action.payload;

        if (_id) {
          state.users = state.users.filter((element) => element._id !== _id);
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.success=false;
        state.loading = true;
        state.users = action.payload;
      });
  },
});

 /**
 * @description  "Exports Statements "
 * @summary 1. Reducers and searchUser action are exported Here
 *          
.
 */

export const { searchUser } = userDetail.actions;
export default userDetail.reducer;