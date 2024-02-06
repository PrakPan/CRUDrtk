import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { searchUser } from "./redux/slice";

const Navbar = () => {
  const [isNavOpen, setNavOpen] = useState(false);

  const handleToggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  const handleLinkClick = () => {
    setNavOpen(false); 
  };

  const allUsers = useSelector((state) => state.app.users);
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    console.log(searchData);
    dispatch(searchUser(searchData));
  }, [searchData]);

  const isSearchDisabled = location.pathname !== "/";

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Redux CRUD APP
          </Link>
          
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleToggleNav}
          >
            <span className="navbar-toggler-icon fs-16"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={handleLinkClick}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/create"
                  className="nav-link"
                  onClick={handleLinkClick}
                >
                  Create User
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link ">
                  {allUsers.length === 0
                    ? "All Users"
                    : `All Users (${allUsers.length})`}
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex desktop-only">
            <input
              className="form-control me-2 "
              type="search"
              placeholder="Search User By name"
              aria-label="Search"
              onChange={(e) => setSearchData(e.target.value)}
              disabled={isSearchDisabled}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
