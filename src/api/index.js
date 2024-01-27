import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4444'
})

export const API = {
    getPosts() {
        return instance.get('/post')
    },
    getTags() {
        return instance.get('/tags')
    },
    getPost(id) {
        return instance.get(`/post/${id}`)
    }
}