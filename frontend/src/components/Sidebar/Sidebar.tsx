import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaVideo,
  FaUser,
  FaPalette,
  FaUmbrellaBeach,
  FaPlusCircle,
} from "react-icons/fa";
import "./Sidebar.scss";

interface Props {}

const Sidebar: React.FC<Props> = (props) => {
  return (
    <div className="sidebar">
      <NavLink className="navStyle" to="/contents">
        <p>
          <FaVideo size={36} /> <span>Contents</span>
        </p>
      </NavLink>
      <NavLink className="navStyle" to="/actors">
        <p>
          <FaUser size={36} /> <span>Actors</span>
        </p>
      </NavLink>
      <NavLink className="navStyle" to="/directors">
        <p>
          <FaPalette size={36} /> <span>Directors</span>
        </p>
      </NavLink>
      <NavLink className="navStyle" to="/studios">
        <p>
          <FaUmbrellaBeach size={36} /> <span>Studios</span>
        </p>
      </NavLink>

      <div className="partition" />

      <NavLink className="navStyle" to="/add/content">
        <p>
          <FaPlusCircle size={36} /> <span>Add Content</span>
        </p>
      </NavLink>
      <NavLink className="navStyle" to="/add/actor">
        <p>
          <FaPlusCircle size={36} /> <span>Add Actor</span>
        </p>
      </NavLink>
      <NavLink className="navStyle" to="/add/director">
        <p>
          <FaPlusCircle size={36} /> <span>Add Director</span>
        </p>
      </NavLink>
      <NavLink className="navStyle" to="/add/studio">
        <p>
          <FaPlusCircle size={36} /> <span>Add Studio</span>
        </p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
