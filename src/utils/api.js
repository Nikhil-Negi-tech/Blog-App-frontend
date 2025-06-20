import axios from 'axios'

const API_URL = 'https://blog-app-backend-33nb.onrender.com/api'

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
})

// Attach JWT token to all requests if available
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Auth API calls
export const registerUser = async (userData) => {
  const { data } = await api.post('/auth/register', userData)
  return data
}

export const loginUser = async (userData) => {
  const { data } = await api.post('/auth/login', userData)
  return data
}

// Blog API calls
export const getBlogs = async () => {
  const { data } = await api.get('/blogs')
  return data
}

export const getUserBlogs = async () => {
  const { data } = await api.get('/blogs/user')
  return data
}

// Public slug‐based fetch (reading)
export const getBlogBySlug = async (slug) => {
  const { data } = await api.get(`/blogs/${slug}`)
  return data
}

// New ID‐based fetch (editing)
export const getBlogById = async (id) => {
  const { data } = await api.get(`/blogs/id/${id}`)
  return data
}

export const createBlog = async (blogData) => {
  const { data } = await api.post('/blogs', blogData)
  return data
}

export const updateBlog = async (id, blogData) => {
  const { data } = await api.put(`/blogs/${id}`, blogData)
  return data
}

export const deleteBlog = async (id) => {
  const { data } = await api.delete(`/blogs/${id}`)
  return data
}

export default api
