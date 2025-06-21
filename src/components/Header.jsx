import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <header
      className="bg-gray-800 text-white"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#212121",
        borderBottom: "1px solid rgb(255, 255, 255)",
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold flex items-center gap-2"
            style={{ textDecoration: "none", color: "white" }}
          >
            <img src="/image.svg" alt="Logo" className="w-8 h-8" />
            Blog App
          </Link>
          {/* Burger Icon */}
          <button
            className="sm:hidden flex flex-col justify-center items-center w-10 h-10"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white mb-1 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-white mb-1 transition-all ${menuOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>
          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-6">
            <Link to="/" className="hover:bg-gray-700 hover:scale-110 transition-all duration-200 px-3 py-1 rounded text-white" style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
            {user ? (
              <>
                <Link to="/create" className="hover:bg-gray-700 hover:scale-110 transition-all duration-200 px-3 py-1 rounded text-white" style={{ textDecoration: "none", color: "white" }}>
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
                <Link to="/login" className="hover:bg-gray-700 hover:scale-110 transition-all duration-200 px-3 py-1 rounded text-white" style={{ textDecoration: "none", color: "white" }}>
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="flex flex-col gap-4 mt-4 sm:hidden bg-gray-900 p-4 rounded shadow">
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:bg-gray-700 px-3 py-2 rounded text-white">
              Home
            </Link>
            {user ? (
              <>
                <Link to="/create" onClick={() => setMenuOpen(false)} className="hover:bg-gray-700 px-3 py-2 rounded text-white">
                  Create Blog
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:bg-gray-700 px-3 py-2 rounded text-white">
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;