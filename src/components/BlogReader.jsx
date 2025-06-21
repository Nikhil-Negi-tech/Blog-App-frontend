import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getBlogBySlug, deleteBlog } from '../utils/api'
import { FiShare2 } from 'react-icons/fi'

const BlogReader = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showShareModal, setShowShareModal] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        const data = await getBlogBySlug(slug)
        setBlog(data)
      } catch {
        setError('Failed to load blog or you lack permission')
      } finally {
        setLoading(false)
      }
    }
    if (slug) fetchBlog()
  }, [slug])

  const handleDelete = async () => {
    if (window.confirm('Are you sure?')) {
      await deleteBlog(blog._id)
      navigate('/')
    }
  }

  if (loading) return <div className="text-center py-8">Loading…</div>
  if (error) return <div className="text-center text-red-600 py-8">{error}</div>
  if (!blog) return <div className="text-center text-red-600 py-8">Blog not found</div>

  const isAuthor = user && blog.author?._id === user._id

  return (
    <div className="max-w-3xl mx-auto">
      {/* Custom styles for markdown prose and blog title */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap');
        .prose, .prose :where(p, h1, h2, h3, h4, h5, h6, strong, em, ul, ol, li, blockquote, code, pre) {
          color: #fff !important;
        }
        .prose :where(a) { color: #60a5fa !important; }
        .prose :where(code, pre) { background: #23272e !important; color: #fff !important; }
        .blog-title-custom {
          font-family: 'Montserrat', 'Poppins', 'Oswald', 'Arial Black', Arial, sans-serif;
          font-size: 2.8rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 0.5rem;
          line-height: 1.1;
          letter-spacing: -1px;
        }
        @media (min-width: 640px) {
          .blog-title-custom {
            font-size: 3.5rem;
          }
        }
      `}</style>
      <article className="bg-[#18181b] text-white p-6 rounded-lg shadow">
        <div className="prose prose-invert prose-headings:font-bold prose-headings:mt-6 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg max-w-none">
          <h1 className="blog-title-custom">{blog.title}</h1>
          <div className="text-gray-400 text-sm mb-6">
            <span>By {blog.author?.username || 'Unknown'}</span>
            <span className="mx-2">•</span>
            <span>{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}</span>
          </div>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {blog.content}
          </ReactMarkdown>
        </div>

        {isAuthor && (
          <div className="mt-8 flex gap-4">
            <Link 
              to={`/edit/${blog._id}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" style={{ textDecoration: 'none', color: 'white' }}
            >
              Edit
            </Link>
            <button 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        )}
      </article>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Share this blog</h2>
            <div className="mb-4">
              <input 
                type="text" 
                value={window.location.href} 
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end">
              <button 
                onClick={() => setShowShareModal(false)}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogReader