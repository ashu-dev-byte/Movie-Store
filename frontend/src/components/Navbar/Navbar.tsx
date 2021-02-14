import React from "react";
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
          <li>Home</li>
          <li>Recent</li>
          <li>Contact</li>
          <li>About</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

/*
import React from "react";
import { useQuery, gql } from "@apollo/client";
import "./Content.scss";

const CONTENT_LIST_QUERY = gql`
  query getContentList {
    contents {
      name
      yearOfRelease
      boxOfficeStatus
    }
  }
`;

interface Props {}

const Content: React.FC<Props> = (props) => {
  const { loading, error, data } = useQuery(CONTENT_LIST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!!</p>;

  return (
    <div>
      <span>Hello</span>
    </div>
  );
};

export default Content;

*/
