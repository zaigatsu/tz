import axios from "axios"
const baseURL = "/api/v1"
const {get, post, put, delete: del } = axios.create({baseURL})

export { get, post, put, del }
