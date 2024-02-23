import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4444'
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')

    return config
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
    },
    getAuth(email, password) {
        return instance.post('/auth/login', {email, password})
    },
    getAuthMe() {
        return instance.get('/auth/me')
    },
    getRegister(fullName, email, password) {
        return instance.post('/auth/register', {fullName, email, password})
    }
}