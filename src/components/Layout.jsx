import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = ({ user, setUser }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} setUser={setUser} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Blog App. All rights reserved by NIKHIL.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
