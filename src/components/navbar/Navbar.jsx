import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  FiSearch,
  FiLogOut,
  FiUser,
  FiShoppingCart,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import authservice from "../../appwrite/Auth";
import SearchBar from "../searchBar/SearchBar";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const cartItems = useSelector((state) => state.cart);

  const [showSearch, setShowSearch] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    authservice.Logout();
    localStorage.clear();
    navigate("/login");
  };

  const navList = (
    <ul className="flex flex-col lg:flex-row lg:space-x-5 space-y-4 lg:space-y-0 text-white font-medium text-md items-center">
      {/* All Product */}
      <li>
        <Link to={"/allproduct"} onClick={() => setMenuOpen(false)}>
          All Product
        </Link>
      </li>

      {/* Signup / Login - only if not logged in */}
      {!user && (
        <>
          <li>
            <Link to={"/signup"} onClick={() => setMenuOpen(false)}>
              Signup
            </Link>
          </li>
          <li>
            <Link to={"/login"} onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          </li>
        </>
      )}

      {/* Search Icon */}
      <li
        className="cursor-pointer flex items-center"
        onClick={() => {
          setShowSearch(!showSearch);
          setMenuOpen(false);
        }}
      >
        <FiSearch size={22} />
      </li>

      {/* Cart - only if logged in */}
      {user && (
        <li>
          <Link
            to={"/cart"}
            className="flex items-center"
            onClick={() => setMenuOpen(false)}
          >
            <FiShoppingCart size={20} className="mr-1" />
            <span>({cartItems.length})</span>
          </Link>
        </li>
      )}

      {/* Profile & Dashboard - only if logged in */}
      {user && (
        <li className="relative">
          <div
            className="w-9 h-9 flex items-center justify-center bg-white rounded-full cursor-pointer text-pink-600"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <FiUser size={20} />
          </div>

          {/* Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50">
              <button
                onClick={() => {
                  navigate(
                    user?.Role === "admin"
                      ? "/admin-dashboard"
                      : "/user-dashboard"
                  );
                  setMenuOpen(false);
                }}
                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                <MdDashboard className="mr-2" /> Dashboard
              </button>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            </div>
          )}
        </li>
      )}
    </ul>
  );

  return (
    <nav className="bg-pink-600 sticky top-0 z-50">
      <div className="flex justify-between items-center py-3 px-4 lg:px-8">
        {/* Left - brand name */}
        <div className="left">
          <Link to={"/"}>
            <h2 className="font-bold text-white text-2xl">E-Bharat</h2>
          </Link>
        </div>

        {/* Hamburger for mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Right nav list (desktop) */}
        <div className="hidden lg:flex">{navList}</div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-pink-700 px-5 py-4">{navList}</div>
      )}

      {/* Search bar toggle */}
      {showSearch && (
        <div className="bg-white p-3 shadow-md">
          <SearchBar />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
