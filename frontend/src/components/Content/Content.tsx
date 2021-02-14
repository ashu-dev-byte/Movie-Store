import React from "react";
import { useQuery, gql } from "@apollo/client";
import Actor from "../Actor/Actor";
import Director from "../Director/Director";
import Studio from "../Studio/Studio";
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
      <Actor />
      <Director />
      <Studio />
    </div>
  );
};

export default Content;