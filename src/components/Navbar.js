import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { searchUser } from "./redux/slice";
import { useNavigate } from "react-router-dom/dist";
import "../index.css";



/**
 * @description  "Below is the Navbar Function Component "
 * @summary 1. All the nav items with their assosciated nav-links are implemented here

 */
const Navbar = () => {
  const allUsers = useSelector((state) => state.app.users);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isNavOpen, setNavOpen] = useState(false);
  const [searchData, setSearchData] = useState("");
  const navigate = useNavigate();


  /**
 * @description  "Below is the useEffect for mounting the component with the set of dependencies "
 * @summary 1.It dispatches search function of the slice for updating search data
 *          2. A encodeURIComponent to show the search Data in URL bar
 *     
 */

  useEffect(() => {
    dispatch(searchUser(searchData));
    if(searchData !== "")
     navigate(`/?search=${encodeURIComponent(searchData)}`);
  }, [searchData, dispatch,navigate]);

  const URL = window.location.href;
  const handleToggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  const handleLinkClick = () => {
    setNavOpen(false);
  };

  const searchHandler = (e) => {
    if (e.key === "Enter") setSearchData(e.target.value);
  };

  const homeHandler = () => {
    setSearchData("");
    navigate("/");
  };

  const isSearchDisabled = location.pathname !== "/";

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
        <div className="container">
          <h1 onClick={homeHandler} className="navbar-brand" style={{ cursor: "pointer" }}>
            Redux CRUD
          </h1>
          {URL.includes("create") || URL.includes("edit") ? (
            <></>
          ) : (
            <div className="flex desktop-only">
              <input
                className="form-control me-2 "
                type="search"
                placeholder="Search User By name"
                aria-label="Search"
                onKeyDown={searchHandler}
                disabled={isSearchDisabled}
              />
            </div>
          )}
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
                <Link to="/create" className="nav-link" onClick={handleLinkClick}>
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
        </div>
      </nav>
    </>
  );
};

export default Navbar;
