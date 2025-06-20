import { useState, useEffect } from 'react'
import { getBlogs, getUserBlogs } from '../utils/api'
import BlogCard from './BlogCard'

const BlogList = ({ userOnly = false }) => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        const data = userOnly ? await getUserBlogs() : await getBlogs()
        setBlogs(data)
      } catch (error) {
        console.error('Error fetching blogs:', error)
        setError('Failed to load blogs. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [userOnly])

  if (loading) {
    return <div className="text-center py-8">Loading blogs...</div>
  }

  if (error) {
    return <div className="text-center text-red-600 py-8">{error}</div>
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-8">
        {userOnly ? 'You haven\'t created any blogs yet.' : 'No blogs available.'}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map(blog => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
