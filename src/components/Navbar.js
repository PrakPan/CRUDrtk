import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isNavOpen, setNavOpen] = useState(false);

  const handleToggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  const handleLinkClick = () => {
    setNavOpen(false); // Close the menu when a link is clicked
  };

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
            </ul>
          </div>
          <div className="flex desktop-only">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search User By name"
              aria-label="Search"
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
