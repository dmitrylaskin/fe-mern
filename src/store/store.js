import { configureStore } from "@reduxjs/toolkit";
import { postsSliceReducer } from "./slices/posts";
import { postSliceReducer } from "./slices/post";


const store = configureStore({
    reducer: {
        posts: postsSliceReducer,
        post: postSliceReducer
    }
})

export default store