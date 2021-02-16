import React from "react";
import { useQuery, gql } from "@apollo/client";
import Card from "../Card/Card";
import "./Content.scss";

const CONTENT_LIST_QUERY = gql`
  query getContentList {
    contents {
      name
      country
    }
  }
`;

interface Props {}

const Content: React.FC<Props> = (props) => {
  const { loading, error, data } = useQuery(CONTENT_LIST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!!</p>;

  return (
    <div className="content">
      <div className="container">
        {data.contents.map((content: any) => (
          <Card name={content.name} country={content.country} />
        ))}
      </div>
    </div>
  );
};

export default Content;
