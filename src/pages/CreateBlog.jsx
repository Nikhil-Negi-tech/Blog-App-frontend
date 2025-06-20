import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BlogEditor from '../components/BlogEditor'
import { createBlog } from '../utils/api'

const CreateBlog = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (blogData) => {
    console.log('CreateBlog received data:', blogData)
    
    try {
      setLoading(true)
      setError('')
      
      const newBlog = await createBlog(blogData)
      console.log('Blog created:', newBlog)
      
      // Redirect to the new blog
      navigate(`/blog/${newBlog.slug}`)
    } catch (error) {
      console.error('Error creating blog:', error)
      setError(error.response?.data?.message || 'Failed to create blog. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Blog</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-8">Creating your blog...</div>
      ) : (
        <BlogEditor 
          key="create-blog-editor" // Add a key to ensure proper mounting
          onSubmit={handleSubmit} 
          submitLabel="Create Blog" 
        />
      )}
    </div>
  )
}

export default CreateBlog
