import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { searchUser } from "./redux/slice";
import { useNavigate } from "react-router-dom/dist";
import '../index.css'

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
  const navigate =useNavigate();

  useEffect(() => {
    console.log(searchData);
    dispatch(searchUser(searchData));
  }, [searchData,dispatch]);

  const isSearchDisabled = location.pathname !== "/";

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
        <div className="container">
          <h1 onClick={()=>{setSearchData("");navigate("/")}} className="navbar-brand" style={{cursor:"pointer"}}> 
            Redux CRUD APP
          </h1>
          <div className="flex desktop-only">
            <input
              className="form-control me-2 "
              type="search"
              placeholder="Search User By name"
              aria-label="Search"
              onKeyDown={(e) => {if(e.key ==='Enter') setSearchData(e.target.value)}}
              disabled={isSearchDisabled}
              list="programmingLanguages"
            />
            <datalist id="programmingLanguages">
                <option value="whiteboard">whiteboard</option>
                <option value="Loan">Loan</option>
                <option value="frugal">frugal</option>
                <option value="usually">usually</option>
                <option value="DNS">DNS</option>
                <option value="Mobility">Mobility</option>
                <option value="Licensed">Licensed</option>
                <option value="navigating">navigating</option>
                <option value="Representative">Representative</option>
                <option value="blind">blind</option>
            </datalist>
          </div>
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
        </div>
      </nav>
    </>
  );
};

export default Navbar;
