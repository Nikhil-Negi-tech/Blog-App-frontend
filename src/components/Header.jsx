import { Link, useNavigate } from "react-router-dom";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="bg-gray-800 text-white" style={{ position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', backgroundColor: '#212121', borderBottom: '1px solid rgb(255, 255, 255)' }}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2 " style={{ textDecoration: 'none', color: 'white' }}>
            <img src="/image.svg" alt="Logo" className="w-8 h-8" />
            Blog App
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/" className="hover:bg-gray-700 hover:scale-110 transition-all duration-200 px-3 py-1 rounded text-white" style={{ textDecoration: 'none', color: 'white', ':hover': { backgroundColor: 'gray' } }}>
              Home
            </Link>
            {user ? (
              <>
                <Link to="/create" className="hover:bg-gray-700 hover:scale-110 transition-all duration-200 px-3 py-1 rounded text-white" style={{ textDecoration: 'none', color: 'white', ':hover': { backgroundColor: 'gray' } }}>
                  Create Blog
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:bg-gray-700 hover:scale-110 transition-all duration-200 px-3 py-1 rounded text-white" style={{ textDecoration: 'none', color: 'white' }}>
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded" style={{ textDecoration: 'none', color: 'white' }}
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
