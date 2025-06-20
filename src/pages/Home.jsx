import { useState } from 'react'
import { Link } from 'react-router-dom'
import BlogList from '../components/BlogList'

const Home = () => {
  const [activeTab, setActiveTab] = useState('all')
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div>
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Blog App</h1>
        <p className="text-xl text-gray-600 mb-6">
          Share your thoughts and ideas with the world
        </p>
        {user ? (
          <Link 
            to="/create" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium" style={{ textDecoration: 'none', color: 'white' }}
          >
            Create New Blog
          </Link>
        ) : (
          <Link 
            to="/login" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium"
          >
            Login to Start Writing
          </Link>
        )}
      </section>

      {user && (
        <div className="mb-8">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === 'all' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Blogs
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === 'my' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('my')}
            >
              My Blogs
            </button>
          </div>
        </div>
      )}

      <BlogList userOnly={activeTab === 'my'} />
    </div>
  )
}

export default Home
