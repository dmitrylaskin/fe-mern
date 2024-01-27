import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../api";

export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
    return await API.getPosts()
})

export const fetchTags = createAsyncThunk('post/fetchTags', async () => {
    return await API.getTags()
})

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        postsItems: [],
        tagsItems: [],
        isLoading: false,
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
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.postsItems = action.payload.data
                state.isLoading = false
            })
            .addCase(fetchPosts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.tagsItems = action.payload.data
            })
    }
})

export const {incremented} = postsSlice.actions
export const postsSliceReducer = postsSlice.reducer