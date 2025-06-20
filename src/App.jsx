import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateBlog from './pages/CreateBlog'
import EditBlog from './pages/EditBlog'
import ReadBlog from './pages/ReadBlog'

function App() {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />
    }
    return children
  }

  return (
    <Routes>
      <Route path="/" element={<Layout user={user} setUser={setUser} />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login setUser={setUser} />} />
        <Route path="register" element={<Register setUser={setUser} />} />
        <Route path="blog/:slug" element={<ReadBlog />} />
        <Route 
          path="create" 
          element={
            <ProtectedRoute>
              <CreateBlog user={user} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="edit/:id" 
          element={
            <ProtectedRoute>
              <EditBlog user={user} />
            </ProtectedRoute>
          } 
        />
      </Route>
    </Routes>
  )
}

export default App
