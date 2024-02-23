import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API} from "../../api";

export const fetchUser = createAsyncThunk('auth/fetchUser', async ({email, password}) => {
    return await API.getAuth(email, password)
})

export const fetchAuthMe = createAsyncThunk('auth/me', async () => {
    return await API.getAuthMe()
})

export const registerUser = createAsyncThunk('auth/registerUser', async ({fullName, email, password}) => {
    return await API.getRegister(fullName, email, password)
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        email:'',
        password:'',
        isLoading: false,
        user: null
    },
    reducers: {
        logout: (state) => {
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload
            state.isLoading = false
        })
        builder.addCase(fetchUser.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
            state.user = action.payload
            state.isLoading = false
        })
        builder.addCase(fetchAuthMe.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.user = action.payload
            state.isLoading = false
        })
        builder.addCase(registerUser.pending, (state, action) => {
            state.isLoading = true
        })
    }
})

export const authSliceReducer = authSlice.reducer
export const {logout} = authSlice.actions