import React from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaStore } from "react-icons/fa";
import "./Navbar.scss";

interface Props {}

const Navbar: React.FC<Props> = (props) => {
  return (
    <div className="navbar">
      <div className="leftSide">
        <FaBars size={32} className="bars" />
        <div className="brand">
          <h2>Movie Store</h2>
          <FaStore size={28} />
        </div>
      </div>
      <div className="rightSide">
        <ul>
          <NavLink className="navStyle" to="/">
            <li>Home</li>
          </NavLink>
          <li>Recent</li>
          <li>Contact</li>
          <li>About</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
