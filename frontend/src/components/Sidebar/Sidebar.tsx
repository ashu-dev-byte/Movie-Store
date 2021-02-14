import React from "react";
import { FaVideo, FaUser, FaPalette, FaUmbrellaBeach } from "react-icons/fa";
import "./Sidebar.scss";

interface Props {}

const Sidebar: React.FC<Props> = (props) => {
  return (
    <div className="sidebar">
      <p>
        <FaVideo size={36} /> <span>Contents</span>
      </p>
      <p>
        <FaUser size={36} /> <span>Actors</span>
      </p>
      <p>
        <FaPalette size={36} /> <span>Directors</span>
      </p>
      <p>
        <FaUmbrellaBeach size={36} /> <span>Studios</span>
      </p>
    </div>
  );
};

export default Sidebar;
