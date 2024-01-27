import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../api";

export const fetchPost = createAsyncThunk('post/fetchPost', async (id) => {
    return await API.getPost(id)
})

const postSlice = createSlice({
    name: 'post',
    initialState: {
        isLoading: false,
        post: {}
    },
    reducers: {
        incremented: state => {
            state.value += 1
        },
        decremented: state => {
            state.value -= 1
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPost.fulfilled, (state, action) => {
                state.post = action.payload.data
                state.isLoading = false
            })
            .addCase(fetchPost.pending, (state) => {
                state.isLoading = true
            })
    }
})

export const {incremented} = postSlice.actions
export const postSliceReducer = postSlice.reducer