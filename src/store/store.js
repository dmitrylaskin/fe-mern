import { configureStore } from "@reduxjs/toolkit";
import { postsSliceReducer } from "./slices/posts";
import { postSliceReducer } from "./slices/post";
import { authSliceReducer } from "./slices/auth";


const store = configureStore({
    reducer: {
        posts: postsSliceReducer,
        post: postSliceReducer,
        auth: authSliceReducer
    }
})

export default store