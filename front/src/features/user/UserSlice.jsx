import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { fetchAllUsers, fetchLoggedInUserById, updateUserById } from './UserApi'

const initialState={
    status:"idle",
    userInfo:null,
    users:[],
    errors:null,
    successMessage:null
}

export const fetchLoggedInUserByIdAsync=createAsyncThunk('user/fetchLoggedInUserByIdAsync',async(id)=>{
    const userInfo=await fetchLoggedInUserById(id)
    return userInfo
})

export const updateUserByIdAsync=createAsyncThunk('user/updateUserByIdAsync',async(update)=>{
    const updatedUser=await updateUserById(update)
    return updatedUser
})

export const fetchAllUsersAsync=createAsyncThunk('user/fetchAllUsersAsync',async()=>{
    const users=await fetchAllUsers()
    return users
})

const userSlice=createSlice({
    name:"userSlice",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchLoggedInUserByIdAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(fetchLoggedInUserByIdAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.userInfo=action.payload
            })
            .addCase(fetchLoggedInUserByIdAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(updateUserByIdAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(updateUserByIdAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.userInfo=action.payload
            })
            .addCase(updateUserByIdAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(fetchAllUsersAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(fetchAllUsersAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.users=action.payload
            })
            .addCase(fetchAllUsersAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })
    }
})

// exporting selectors
export const selectUserStatus=(state)=>state.UserSlice.status
export const selectUserInfo=(state)=>state.UserSlice.userInfo
export const selectUsers=(state)=>state.UserSlice.users
export const selectUserErrors=(state)=>state.UserSlice.errors
export const selectUserSuccessMessage=(state)=>state.UserSlice.successMessage

export default userSlice.reducer