import { Link, useNavigate } from "react-router-dom";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2 " style={{ textDecoration: 'none', color: 'white' }}>
            <img src="/image.svg" alt="Logo" className="w-8 h-8" />
            Blog App
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/" className="hover:text-gray-300" style={{ textDecoration: 'none', color: 'white' }}>
              Home
            </Link>
            {user ? (
              <>
                <Link to="/create" className="hover:text-gray-300" style={{ textDecoration: 'none', color: 'white' }}>
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
                <Link to="/login" className="hover:text-gray-300" style={{ textDecoration: 'none', color: 'white' }}>
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
