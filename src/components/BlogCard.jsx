import { Link } from 'react-router-dom'

const BlogCard = ({ blog }) => {
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Truncate content for preview
  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">
          <Link to={`/blog/${blog.slug}`} className="text-blue-600 hover:text-blue-800">
            {blog.title}
          </Link>
        </h2>
        <div className="text-gray-500 text-sm mb-4">
          <span>By {blog.author?.username || 'Unknown'}</span>
          <span className="mx-2">•</span>
          <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
        </div>
        <p className="text-gray-700 mb-4">
          {truncateContent(blog.content)}
        </p>
        <Link 
          to={`/blog/${blog.slug}`}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" style={{ textDecoration: 'none', color: 'white' }}
        >
          Read More
        </Link>
      </div>
    </div>
  )
}

export default BlogCard
