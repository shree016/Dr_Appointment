import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { HashLink } from "react-router-hash-link";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import jwt_decode from "jwt-decode";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const Navbar = () => {
  const [iconActive, setIconActive] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
 
  const dropdownRef = useRef(null);

useEffect(() => {
  if (!token) return;

  try {
    const decoded = jwt_decode(token);
    const { userId } = decoded;

    // Fetch full user details (includes pic)
    axios
      .get(`/user/getuser/${userId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data); // now user has pic, name, etc.
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  } catch (error) {
    console.error("Invalid token");
    setUser(null);
  }
}, [token]);






  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logoutFunc = () => {
    dispatch(setUserInfo({}));
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    navigate("/login");
  };

  const handleProfileClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  const isLoggedIn = !!token;
  const isAdmin = user?.isAdmin;
  const isDoctor = user?.isDoctor;

  return (
    <header>
      <nav className={iconActive ? "nav-active" : ""}>
        <h2 className="nav-logo">
          <NavLink to={"/"}>Dr_Appoint</NavLink>
        </h2>

        <ul className="nav-links">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>

          {!isDoctor && !isAdmin && (
            <li>
              <NavLink to={"/doctors"}>Doctors</NavLink>
            </li>
          )}

          {isLoggedIn && isAdmin && (
            <li>
              <NavLink to={"/dashboard/users"}>Dashboard</NavLink>
            </li>
          )}

          {isLoggedIn && !isAdmin && (
            <>
              <li>
                <NavLink to={"/appointments"}>Appointments</NavLink>
              </li>
              {!isDoctor && (
                <li>
                  <NavLink to={"/applyfordoctor"}>Apply for doctor</NavLink>
                </li>
              )}
              <li>
                <HashLink to={"/#contact"}>Contact Us</HashLink>
              </li>
            </>
          )}
        </ul>

        {/* --- Sign In / Profile --- */}
        <div className="top-right-btn" ref={dropdownRef}>
          {!isLoggedIn ? (
            <NavLink className="btn signin-btn" to={"/login"}>
              Sign In
            </NavLink>
          ) : (
            <div className="profile-container">
              <div className="profile-avatar" onClick={handleProfileClick}>
                <img
                  src={
                    user?.pic ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile"
                />
              </div>

              {dropdownOpen && (
                <div className="profile-dropdown">
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      navigate("/profile");
                      setDropdownOpen(false);
                    }}
                  >
                    Profile
                  </button>
                  <button className="dropdown-item logout" onClick={logoutFunc}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      <div className="menu-icons">
        {!iconActive ? (
          <FiMenu className="menu-open" onClick={() => setIconActive(true)} />
        ) : (
          <RxCross1 className="menu-close" onClick={() => setIconActive(false)} />
        )}
      </div>
    </header>
  );
};

export default Navbar;
