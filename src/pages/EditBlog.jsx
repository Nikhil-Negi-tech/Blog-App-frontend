import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BlogEditor from '../components/BlogEditor'
import { getBlogById, updateBlog } from '../utils/api'

const EditBlog = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        const data = await getBlogById(id)
        setBlog(data)
      } catch (err) {
        console.error('Error fetching blog:', err)
        setError('Failed to load blog. It may have been removed or you do not have permission to edit it.')
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchBlog()
  }, [id])

  const handleSubmit = async (blogData) => {
    try {
      setSaving(true)
      setError('')
      const updated = await updateBlog(blog._id, blogData)
      navigate(`/blog/${updated.slug}`)
    } catch (err) {
      console.error('Error updating blog:', err)
      setError(err.response?.data?.message || 'Failed to update blog. Please try again.')
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading blog...</div>
  }

  if (error) {
    return <div className="text-center text-red-600 py-8">{error}</div>
  }

  if (!blog) {
    return <div className="text-center text-red-600 py-8">Blog not found</div>
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>
      {saving ? (
        <div className="text-center py-8">Saving your changes...</div>
      ) : (
        <BlogEditor
          initialData={blog}
          onSubmit={handleSubmit}
          submitLabel="Update Blog"
        />
      )}
    </div>
  )
}

export default EditBlog
