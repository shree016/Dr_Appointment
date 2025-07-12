import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { HashLink } from "react-router-hash-link";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import jwt_decode from "jwt-decode";

const Navbar = () => {
  const [iconActive, setIconActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token");
        setUser(null);
      }
    }
  }, [token]);

  const logoutFunc = () => {
    dispatch(setUserInfo({}));
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    navigate("/login");
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

          {/* Show Doctors only if not a doctor and admin  */}
          {!isDoctor && !isAdmin && (
            <li>
              <NavLink to={"/doctors"}>Doctors</NavLink>
            </li>
          )}

          {/* Admin-only route */}
          {isLoggedIn && isAdmin && (
            <li>
              <NavLink to={"/dashboard/users"}>Dashboard</NavLink>
            </li>
          )}

          {/* Logged-in non-admin users */}
          {isLoggedIn && !isAdmin && (
            <>
              <li>
                <NavLink to={"/appointments"}>Appointments</NavLink>
              </li>

              {/* Show only if NOT a doctor */}
              {!isDoctor && (
                <li>
                  <NavLink to={"/applyfordoctor"}>Apply for doctor</NavLink>
                </li>
              )}

              <li>
                <HashLink to={"/#contact"}>Contact Us</HashLink>
              </li>
              <li>
                <NavLink to={"/profile"}>Profile</NavLink>
              </li>
            </>
          )}

          {!isLoggedIn ? (
            <>
              <li>
                <NavLink className="btn" to={"/login"}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink className="btn" to={"/register"}>
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <span className="btn" onClick={logoutFunc}>
                Logout
              </span>
            </li>
          )}
        </ul>
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
