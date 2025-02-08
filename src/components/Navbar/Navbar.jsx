import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai";

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const Links = [
    { title: "Home", link: "/" },
    { title: "CD", link: "/CD" },
    { title: "DVD", link: "/DVD" },
    { title: "Store Info", link: "/Store Info" },
    { title: "Cart", link: "/Cart" },
    { title: "Profile", link: "/Profile" },
    { title: "Admin Profile", link: "/Profile" },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  if (!isLoggedIn) Links.splice(4, 4);
  if (isLoggedIn && role === "user") Links.splice(6, 1);
  if (isLoggedIn && role === "admin") Links.splice(4, 2);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("title", searchInput);
      navigate(`/search-results?${queryParams.toString()}`);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <div className="flex items-center justify-between px-8 py-4 font-sans shadow-lg bg-slate-900">
      {/* Logo Section */}
      <Link to="/" className="flex items-center space-x-4">
        <img src="./images/logo/bing.png" alt="" className="w-10 h-10" />
        <h1 className="text-2xl font-black text-sky-500">VideoStack</h1>
      </Link>

      {/* Search Bar - Only visible on desktop */}
      <div className="hidden lg:flex flex-1 mx-8 relative">
        <form onSubmit={handleSearch} className="relative w-full">
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full px-4 py-2 rounded-lg text-slate-200 bg-slate-800"
          />
          <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
            <AiOutlineSearch size={20} />
          </button>
        </form>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden lg:flex items-center gap-8 text-white font-semibold">
        {Links.map((items, i) => (
          <Link to={items.link} key={i} className="hover:text-sky-500 transition-all duration-300">
            {items.title}
          </Link>
        ))}

        {/* Authentication Buttons */}
        {!isLoggedIn && (
          <div className="flex gap-4">
            <Link to="/Login" className="px-4 py-2 border rounded-lg text-blue-600 hover:bg-blue-50">
              Log In
            </Link>
            <Link to="/CreateAccount" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Create Account
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Hamburger Menu Button */}
      <button className="text-white lg:hidden" onClick={() => setMenuOpen(true)}>
        <AiOutlineMenu size={28} />
      </button>

      {/* Fullscreen Overlay Menu for Mobile */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-slate-900 bg-opacity-95 flex flex-col items-center justify-center text-white z-50">
          {/* Close Button */}
          <button className="absolute top-6 right-6 text-white text-3xl" onClick={() => setMenuOpen(false)}>
            <AiOutlineCloseCircle size={30} />
          </button>

           {/* Mobile Search Bar */}
           <div className="w-4/5 mb-6">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-slate-200 bg-slate-800"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
                <AiOutlineSearch size={20} />
              </button>
            </form>
          </div>
          
          {/* Mobile Navigation Links */}
          <nav className="flex flex-col gap-6 text-2xl font-bold text-gray-300">
            {Links.map((items, i) => (
              <Link
                to={items.link}
                key={i}
                onClick={() => setMenuOpen(false)}
                className="hover:text-sky-500 transition-all duration-300"
              >
                {items.title}
              </Link>
            ))}

            {/* Authentication Buttons */}
            {!isLoggedIn && (
              <div className="flex flex-col gap-4 mt-4">
                <Link
                  to="/Login"
                  className="px-6 py-3 border border-white rounded-lg text-white hover:bg-white hover:text-slate-900 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/CreateAccount"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Create Account
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
